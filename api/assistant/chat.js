module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const msg = (body.message || body.query || '').trim().toLowerCase();
  if (!msg) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  let reply = "I am your StockSense AI Inventory Assistant. You can ask me about current stock quantities, low stock items, reorder alerts, pending receipts, and delivery orders.";

  if (msg.includes('low') || msg.includes('alert') || msg.includes('reorder')) {
    reply = "⚠️ Low Stock Alert: We have 2 SKUs currently near or below safety threshold: 'Industrial Bearings' (18 units, threshold 25) and 'Hydraulic Valve' (12 units, threshold 20). Reorder rules recommend generating POs totaling 35 units.";
  } else if (msg.includes('out of stock') || msg.includes('zero')) {
    reply = "🚨 Out of Stock: 'Copper Wire 2.5mm' is currently at 0 units on hand at Central Staging. A replenishment receipt (WH/IN/0014) is scheduled for vendor delivery tomorrow.";
  } else if (msg.includes('total') || msg.includes('overview') || msg.includes('how much stock')) {
    reply = "📊 Inventory Overview: Total recorded inventory is 4,472 units across 8 active product categories in 3 warehouses (Central Staging, North Bay, and South Hub). Total stock valuation is ₹18,42,500.";
  } else if (msg.includes('receipt') || msg.includes('incoming')) {
    reply = "📥 Inbound Operations: 4 receipts are pending verification at Receiving Bay A, totaling 340 incoming units across Steel Rods, Aluminum Billets, and Industrial Fasteners.";
  } else if (msg.includes('delivery') || msg.includes('outgoing') || msg.includes('dispatch')) {
    reply = "📦 Outbound Logistics: 3 delivery orders are queued for picking and dispatch today. All items have been reserved and stock availability is confirmed.";
  } else if (msg.includes('steel') || msg.includes('rod')) {
    reply = "📦 Steel Rods (SKU: STL-ROD-01): 850 units available across Main Store Bay A (650 units) and Production Rack 3 (200 units). Stock status is healthy.";
  } else if (msg.includes('bearing')) {
    reply = "⚠️ Industrial Bearings (SKU: BRG-IND-08): 18 units in stock at Bay C. Reorder minimum is 25. An automated purchase draft has been flagged.";
  }

  return res.status(200).json({
    success: true,
    reply: reply,
    timestamp: new Date().toISOString()
  });
};
