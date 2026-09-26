const { memStore, parseCookies, verifyToken } = require('../_shared');

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

  const email = (body.email || '').trim().toLowerCase();
  const password = body.password || '';

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const cookies = parseCookies(req);
  const updatedCreds = verifyToken(cookies.ss_creds);

  let user = memStore.users[email];
  if (!user && updatedCreds && updatedCreds.email === email) {
    user = {
      id: Date.now(),
      name: updatedCreds.name || email.split('@')[0],
      email: email,
      role: updatedCreds.role || 'Inventory Operations Lead',
      pass: updatedCreds.pass
    };
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  let validPass = user.pass;
  if (updatedCreds && updatedCreds.email === email && updatedCreds.pass) {
    validPass = updatedCreds.pass;
  }

  if (password !== validPass) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: email,
      role: user.role
    }
  });
};
