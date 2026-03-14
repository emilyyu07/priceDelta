#!/bin/bash

# PriceDelta Scraper Debugging Script
# This script helps diagnose and fix scraper issues

echo "🔍 PriceDelta Scraper Debugging Tool"
echo "=================================="

# Function to check service status
check_service() {
    local service=$1
    local container=$2
    
    echo "📡 Checking $service..."
    if docker ps | grep -q $container; then
        echo "✅ $service is running"
        return 0
    else
        echo "❌ $service is not running"
        return 1
    fi
}

# Function to get actual container name
get_container_name() {
    local service=$1
    local container_name=$(docker ps --format "table {{.Names}}" | grep $service | head -1)
    echo "$container_name"
}

# Function to test connectivity
test_connection() {
    local service=$1
    local test_command=$2
    
    echo "🔌 Testing $service connectivity..."
    if eval $test_command > /dev/null 2>&1; then
        echo "✅ $service connection OK"
        return 0
    else
        echo "❌ $service connection failed"
        return 1
    fi
}

# Function to check queue status
check_queue() {
    echo "📋 Checking Redis Queue Status..."
    
    # Get actual Redis container name
    local redis_container=$(get_container_name "redis")
    if [ -z "$redis_container" ]; then
        echo "❌ Redis container not found"
        return 1
    fi
    
    # Get queue length
    local queue_length=$(docker exec $redis_container redis-cli llen price-scrape-queue 2>/dev/null || echo "0")
    echo "   Queue length: $queue_length"
    
    # Check for active workers
    local active_jobs=$(docker exec $redis_container redis-cli keys "bull:price-scrape-queue:*" 2>/dev/null | wc -l || echo "0")
    echo "   Active jobs: $active_jobs"
    
    if [ "$queue_length" -gt 5 ]; then
        echo "⚠️  Queue backing up ($queue_length jobs waiting)"
        return 1
    else
        echo "✅ Queue looks healthy"
        return 0
    fi
}

# Function to check database
check_database() {
    echo "🗄️  Checking Database Status..."
    
    # Get actual PostgreSQL container name
    local postgres_container=$(get_container_name "postgres")
    if [ -z "$postgres_container" ]; then
        echo "❌ PostgreSQL container not found"
        return 1
    fi
    
    # Test database connection
    if docker exec $postgres_container pg_isready -U admin > /dev/null 2>&1; then
        echo "✅ PostgreSQL is ready"
        
        # Check for stuck listings
        local stuck_count=$(docker exec $postgres_container psql -U admin -d pricedelta -t -c "SELECT COUNT(*) FROM productListing WHERE isActive = false AND createdAt < NOW() - INTERVAL '10 minutes';" 2>/dev/null | tr -d ' ' || echo "0")
        echo "   Stuck listings (older than 10min): $stuck_count"
        
        if [ "$stuck_count" -gt 0 ]; then
            echo "⚠️  Found $stuck_count stuck listings"
            return 1
        else
            return 0
        fi
    else
        echo "❌ PostgreSQL is not ready"
        return 1
    fi
}

# Function to check backend logs for errors
check_backend_logs() {
    echo "📝 Checking Backend Logs for Errors..."
    
    # Get recent error logs
    local error_count=$(docker logs pricedelta-backend --since=10m 2>&1 | grep -i -c "error\|fail\|timeout" || echo "0")
    echo "   Recent errors (last 10min): $error_count"
    
    if [ "$error_count" -gt 3 ]; then
        echo "⚠️  High error count detected"
        echo "🔍 Recent error sample:"
        docker logs pricedelta-backend --since=5m 2>&1 | grep -i "error\|fail\|timeout" | tail -3
        return 1
    else
        echo "✅ Error count looks normal"
        return 0
    fi
}

# Function to get queue health from API
check_api_health() {
    echo "🌐 Checking API Health Endpoint..."
    
    local health_response=$(curl -s http://localhost:3001/api/products/health 2>/dev/null)
    
    if [ $? -eq 0 ] && echo "$health_response" | grep -q "healthy"; then
        echo "✅ API health check passed"
        echo "   Queue status: $(echo "$health_response" | grep -o '"waiting":[0-9]*' | cut -d':' -f2) waiting, $(echo "$health_response" | grep -o '"active":[0-9]*' | cut -d':' -f2) active"
        return 0
    else
        echo "❌ API health check failed"
        if [ -n "$health_response" ]; then
            echo "   Response: $health_response"
        fi
        return 1
    fi
}

# Function to clear stuck jobs
clear_stuck_jobs() {
    echo "🧹 Clearing Stuck Jobs..."
    
    # Call the clear jobs API
    local clear_response=$(curl -s -X POST http://localhost:3001/api/products/clear-stuck-jobs 2>/dev/null)
    
    if [ $? -eq 0 ] && echo "$clear_response" | grep -q "cleared"; then
        echo "✅ Jobs cleared successfully"
        return 0
    else
        echo "❌ Failed to clear jobs"
        if [ -n "$clear_response" ]; then
            echo "   Response: $clear_response"
        fi
        return 1
    fi
}

# Function to restart services
restart_services() {
    echo "🔄 Restarting Services..."
    
    echo "   Restarting backend..."
    docker restart pricedelta-backend
    
    echo "   Waiting for services to be ready..."
    sleep 10
    
    echo "✅ Services restarted"
}

# Main diagnostic flow
echo ""
echo "🚀 Starting Diagnostic Checks..."
echo ""

# Check all services
services_ok=true
check_service "Redis" "redis" || services_ok=false
check_service "PostgreSQL" "postgres" || services_ok=false
check_service "Backend" "pricedelta-backend" || services_ok=false

if [ "$services_ok" = false ]; then
    echo ""
    echo "❌ Some services are not running. Please start them with:"
    echo "   docker-compose up -d"
    exit 1
fi

echo ""
echo "🔍 Running Connectivity Tests..."
echo ""

# Test connections
connections_ok=true
redis_container=$(get_container_name "redis")
postgres_container=$(get_container_name "postgres")

test_connection "Redis" "docker exec $redis_container redis-cli ping" || connections_ok=false
test_connection "Database" "docker exec $postgres_container pg_isready -U admin" || connections_ok=false

if [ "$connections_ok" = false ]; then
    echo ""
    echo "❌ Some connections failed. Check service logs with:"
    echo "   docker logs $redis_container"
    echo "   docker logs $postgres_container"
    exit 1
fi

echo ""
echo "📊 Checking Application Status..."
echo ""

# Check application components
issues_found=false
check_queue || issues_found=true
check_database || issues_found=true
check_backend_logs || issues_found=true
check_api_health || issues_found=true

echo ""
echo "🎯 Diagnostic Summary:"
echo "======================"

if [ "$issues_found" = true ]; then
    echo "⚠️  Issues detected! Here are the recommended actions:"
    echo ""
    echo "🔧 Quick Fixes:"
    echo "   1. Clear stuck jobs:     curl -X POST http://localhost:3001/api/products/clear-stuck-jobs"
    echo "   2. Restart backend:     docker restart pricedelta-backend"
    echo "   3. Check live logs:      docker logs -f pricedelta-backend"
    echo "   4. Monitor queue:       docker exec $redis_container redis-cli llen price-scrape-queue"
    echo ""
    echo "🔍 Manual Debugging:"
    echo "   1. Test scraper manually: curl -X POST http://localhost:3001/api/products/track -d '{\"url\":\"https://www.aritzia.com/en/product/test\"}'"
    echo "   2. Check database:       docker exec $postgres_container psql -U admin -d pricedelta -c \"SELECT * FROM productListing WHERE isActive = false ORDER BY createdAt DESC LIMIT 5;\""
    echo "   3. Monitor Redis:       docker exec -it $redis_container redis-cli monitor"
    echo ""
    
    read -p "Would you like to clear stuck jobs now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        clear_stuck_jobs
        echo ""
        read -p "Would you like to restart the backend? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            restart_services
        fi
    fi
else
    echo "✅ Everything looks healthy!"
    echo ""
    echo "📊 Current Status:"
    echo "   - All services running"
    echo "   - Connections working"
    echo "   - Queue processing normally"
    echo "   - No recent errors"
    echo "   - API health check passed"
fi

echo ""
echo "🏁 Diagnostic Complete!"
echo "========================"
