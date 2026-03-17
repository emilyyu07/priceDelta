"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearStuckJobs = exports.getQueueHealth = exports.getTrackStatus = exports.trackProduct = void 0;
const priceQueue_1 = require("../queue/priceQueue");
const urlParser_1 = require("../utils/urlParser");
const prisma_1 = __importDefault(require("../config/prisma"));
const trackProduct = async (req, res) => {
    try {
        const { url } = req.body;
        // normalize URL
        const { cleanUrl, externalId } = (0, urlParser_1.parseUrl)(url);
        const storeName = (0, urlParser_1.extractStoreName)(cleanUrl);
        //ensure retailer exists
        const retailer = await prisma_1.default.retailer.upsert({
            where: { name: storeName },
            update: {},
            create: {
                name: storeName,
                apiUrl: new URL(cleanUrl).origin,
                isActive: true,
            },
        });
        //ensure product exists
        const product = await prisma_1.default.product.upsert({
            where: { externalId: externalId },
            update: {},
            create: {
                externalId: externalId,
                title: `Aritzia Item ${externalId}`, // Placeholder name
                url: cleanUrl,
                // optional: description, category, imageUrl
            },
        });
        // create "pending" Listing in PostgreSQL so we have an ID
        const listing = await prisma_1.default.productListing.upsert({
            where: {
                productId_retailerId: {
                    productId: product.id,
                    retailerId: retailer.id,
                },
            },
            update: {
                url: cleanUrl,
                isActive: false, // Mark as pending for scraper
            },
            create: {
                productId: product.id,
                retailerId: retailer.id,
                currentPrice: 0,
                url: cleanUrl,
                isActive: false,
            },
        });
        // push job to queue
        await priceQueue_1.scrapeQueue.add("scrape-aritzia", {
            productUrl: cleanUrl,
            listingId: listing.id,
        });
        //respond to frontend
        res.status(202).json({
            message: "Scrape job added to queue.",
            listingId: listing.id,
            status: "PENDING",
        });
    }
    catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
exports.trackProduct = trackProduct;
const getTrackStatus = async (req, res) => {
    try {
        const listingId = Array.isArray(req.params.listingId)
            ? req.params.listingId[0]
            : req.params.listingId;
        // find listing in database
        const listing = await prisma_1.default.productListing.findUnique({
            where: { id: listingId },
        });
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        // check if pending
        if (!listing.isActive) {
            return res.status(200).json({ status: "PENDING" });
        }
        // check if done
        return res.status(200).json({
            status: "COMPLETED",
            productId: listing.productId,
            price: listing.currentPrice,
        });
    }
    catch (error) {
        console.error("Status Check Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getTrackStatus = getTrackStatus;
const getQueueHealth = async (_req, res) => {
    try {
        // Check queue status
        const waiting = await priceQueue_1.scrapeQueue.getWaiting();
        const active = await priceQueue_1.scrapeQueue.getActive();
        const completed = await priceQueue_1.scrapeQueue.getCompleted();
        const failed = await priceQueue_1.scrapeQueue.getFailed();
        // Check database connection
        const dbStatus = await prisma_1.default.$queryRaw `SELECT 1 as status`;
        // Check Redis connection by trying to get queue info
        let redisStatus = "connected";
        try {
            await priceQueue_1.scrapeQueue.getWaiting();
        }
        catch (error) {
            redisStatus = "disconnected";
        }
        res.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            queue: {
                waiting: waiting.length,
                active: active.length,
                completed: completed.length,
                failed: failed.length,
            },
            database: dbStatus ? "connected" : "disconnected",
            redis: redisStatus,
        });
    }
    catch (error) {
        console.error("Health Check Error:", error);
        res.status(500).json({
            status: "unhealthy",
            error: error.message,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.getQueueHealth = getQueueHealth;
const clearStuckJobs = async (_req, res) => {
    try {
        // Clear all jobs in queue
        await priceQueue_1.scrapeQueue.obliterate({ force: true });
        // Update stuck listings to active=false
        await prisma_1.default.productListing.updateMany({
            where: {
                isActive: false,
                createdAt: {
                    lt: new Date(Date.now() - 10 * 60 * 1000), // Older than 10 minutes
                },
            },
            data: { isActive: false },
        });
        res.json({
            message: "Queue cleared and stuck listings reset",
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error("Clear Jobs Error:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.clearStuckJobs = clearStuckJobs;
//# sourceMappingURL=product.controller.js.map