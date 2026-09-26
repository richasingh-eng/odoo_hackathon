const crypto = require('crypto');
const { memStore, saveStore, signToken, verifyToken, parseCookies, setCookie, clearCookie, EMAIL_REGEX } = require('../_shared');

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
  const otp = (body.otp || '').trim();

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const cookies = parseCookies(req);
  const cookieRecord = verifyToken(cookies.ss_otp_state);
  let record = memStore.otpRecords[email] || cookieRecord;

  const now = Date.now();
  if (!record || !record.otpHash) {
    return res.status(400).json({ error: 'OTP has expired. Please request a new OTP.' });
  }

  if (now > record.expiresAt) {
    if (memStore.otpRecords[email]) memStore.otpRecords[email].otpHash = null;
    saveStore();
    clearCookie(res, 'ss_otp_state');
    return res.status(400).json({ error: 'OTP has expired. Please request a new OTP.' });
  }

  if (record.attempts >= 5) {
    if (memStore.otpRecords[email]) memStore.otpRecords[email].otpHash = null;
    saveStore();
    clearCookie(res, 'ss_otp_state');
    return res.status(400).json({ error: 'Too many incorrect attempts. Please request a new OTP.' });
  }

  const isValidFormat = otp && otp.length === 6 && /^\d{6}$/.test(otp);
  const computedHash = isValidFormat ? crypto.createHash('sha256').update(record.salt + otp).digest('hex') : '';
  const isMatch = isValidFormat && (computedHash === record.otpHash);

  if (!isMatch) {
    record.attempts = (record.attempts || 0) + 1;
    if (memStore.otpRecords[email]) {
      memStore.otpRecords[email].attempts = record.attempts;
      if (record.attempts >= 5) {
        memStore.otpRecords[email].otpHash = null;
      }
      saveStore();
    }
    if (record.attempts >= 5) {
      clearCookie(res, 'ss_otp_state');
      return res.status(400).json({ error: 'Too many incorrect attempts. Please request a new OTP.' });
    }
    const updatedToken = signToken(record);
    setCookie(res, 'ss_otp_state', updatedToken, 300);
    return res.status(400).json({ error: 'Incorrect OTP. Please check the code and try again.' });
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpires = now + 600000;

  if (memStore.otpRecords[email]) {
    memStore.otpRecords[email].otpHash = null;
    memStore.otpRecords[email].salt = null;
    memStore.otpRecords[email].resetToken = resetToken;
    memStore.otpRecords[email].resetTokenExpires = resetTokenExpires;
    memStore.otpRecords[email].attempts = 0;
    saveStore();
  }

  clearCookie(res, 'ss_otp_state');
  const resetTokenPayload = { email, resetToken, expiresAt: resetTokenExpires };
  const resetTokenSigned = signToken(resetTokenPayload);
  setCookie(res, 'ss_reset_token', resetTokenSigned, 600);

  return res.status(200).json({
    success: true,
    message: 'OTP verified successfully.',
    reset_token: resetToken
  });
};
