import fetch from 'node-fetch';

async function run() {
  const baseUrl = 'http://localhost:3001/api';
  
  // 1. Register a test user
  const email = `test-${Date.now()}@example.com`;
  const registerRes = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'password123', name: 'Test User' })
  });
  
  if (!registerRes.ok) {
    console.error('Failed to register:', await registerRes.text());
    return;
  }
  
  const token = (await registerRes.json()).token;
  console.log('Registered and got token:', token);
  
  // 2. We need a valid product ID. Let's fetch products first.
  const productsRes = await fetch(`${baseUrl}/products`);
  const products = await productsRes.json();
  if (products.data.length === 0) {
    console.error('No products available to alert on.');
    return;
  }
  const productId = products.data[0].id;
  
  // 3. Create an alert
  const createRes = await fetch(`${baseUrl}/alerts`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, targetPrice: 50.0 })
  });
  
  if (!createRes.ok) {
    console.error('Failed to create alert:', await createRes.text());
    return;
  }
  
  const alertId = (await createRes.json()).alert.id;
  console.log('Created alert:', alertId);
  
  // 4. Test the PATCH request!
  const updateRes = await fetch(`${baseUrl}/alerts/${alertId}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ targetPrice: 45.0 })
  });
  
  const updateStatus = updateRes.status;
  const updateResponse = await updateRes.text();
  console.log(`PATCH status: ${updateStatus}`);
  console.log(`PATCH response: ${updateResponse}`);
}

run().catch(console.error);
