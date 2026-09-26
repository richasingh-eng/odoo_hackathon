const crypto = require('crypto');
const { memStore, saveStore, signToken, setCookie, logEmail, EMAIL_REGEX } = require('../_shared');

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
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const user = memStore.users[email];
  if (!user) {
    return res.status(404).json({ error: 'The email address or account details are incorrect.' });
  }

  const record = memStore.otpRecords[email];
  const now = Date.now();
  if (record && record.requestedAt && (now - record.requestedAt < 30000)) {
    const waitSec = Math.ceil((30000 - (now - record.requestedAt)) / 1000);
    return res.status(429).json({ error: `Please wait ${waitSec} seconds before requesting a new OTP.` });
  }

  const otp = String(crypto.randomInt(100000, 1000000));
  const salt = crypto.randomBytes(16).toString('hex');
  const otpHash = crypto.createHash('sha256').update(salt + otp).digest('hex');
  const expiresAt = now + 300000;

  const newRecord = {
    email,
    otpHash,
    salt,
    expiresAt,
    attempts: 0,
    requestedAt: now
  };
  memStore.otpRecords[email] = newRecord;
  saveStore();

  const token = signToken(newRecord);
  setCookie(res, 'ss_otp_state', token, 300);

  const subject = 'StockSense Password Reset OTP';
  const bodyText = `StockSense — Modern Inventory Management System\n\nYour StockSense password reset OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.\n\nSECURITY NOTICE: Do not share this OTP with anyone. StockSense support will never ask for your verification code.\n\nIf you did not request a password reset, you can safely ignore this email.\n`;
  logEmail(email, subject, bodyText);

  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const emailEntry = `[${ts}] TO: ${email} | SUBJECT: ${subject}\n${bodyText}\n=======================================================\n`;
  const emailToken = signToken({ text: emailEntry });
  setCookie(res, 'ss_last_email', emailToken, 300);

  return res.status(200).json({
    success: true,
    message: 'New OTP sent successfully to registered email address.',
    expires_in: 300
  });
};
