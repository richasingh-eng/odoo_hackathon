const { memStore, saveStore, verifyToken, parseCookies, clearCookie } = require('../_shared');

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
  const resetToken = (body.reset_token || '').trim();
  const password = body.password || '';
  const confirmPassword = body.confirm_password || '';

  if (!email || !resetToken) {
    return res.status(400).json({ error: 'Session expired or invalid reset token. Please request a new OTP.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must contain at least 8 characters.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const cookies = parseCookies(req);
  const cookieRecord = verifyToken(cookies.ss_reset_token);
  const memRecord = memStore.otpRecords[email];

  const now = Date.now();
  let valid = false;

  if (cookieRecord && cookieRecord.resetToken === resetToken && cookieRecord.email === email && cookieRecord.expiresAt > now) {
    valid = true;
  } else if (memRecord && memRecord.resetToken === resetToken && memRecord.resetTokenExpires > now) {
    valid = true;
  }

  if (!valid) {
    return res.status(400).json({ error: 'Session expired or invalid reset token. Please request a new OTP.' });
  }

  if (!memStore.users[email]) {
    memStore.users[email] = {
      id: Date.now(),
      name: email.split('@')[0],
      role: 'Inventory Operations Lead',
      pass: password
    };
  } else {
    memStore.users[email].pass = password;
  }

  if (memStore.otpRecords[email]) {
    memStore.otpRecords[email].resetToken = null;
    memStore.otpRecords[email].resetTokenExpires = null;
  }
  saveStore();

  clearCookie(res, 'ss_reset_token');
  clearCookie(res, 'ss_otp_state');

  return res.status(200).json({
    success: true,
    message: 'Password reset successfully.'
  });
};
