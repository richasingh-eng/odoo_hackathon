const { memStore, saveStore, EMAIL_REGEX } = require('../_shared');

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

  const name = (body.name || '').trim();
  const email = (body.email || '').trim().toLowerCase();
  const role = (body.role || 'Warehouse Staff').trim();
  const password = body.password || '';

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
  }

  if (memStore.users[email]) {
    return res.status(400).json({ error: 'An account with this email already exists.' });
  }

  const uid = Date.now();
  memStore.users[email] = {
    id: uid,
    name,
    role,
    pass: password
  };
  saveStore();

  return res.status(200).json({
    success: true,
    message: 'Account created successfully.',
    user: {
      id: uid,
      name,
      email,
      role
    }
  });
};
