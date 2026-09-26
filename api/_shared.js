const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const SECRET = process.env.STOCKSENSE_SECRET || 'stocksense_enterprise_secure_token_secret_2026';
const TMP_FILE = path.join('/tmp', 'stocksense_store.json');
const EMAIL_LOG_FILE = path.join('/tmp', 'sent_emails.log');

const DEFAULT_USERS = {
  'aarav.sharma@stocksense.in': { id: 1, name: 'Aarav Sharma', role: 'Inventory Operations Lead', pass: 'admin123' },
  'vikram.m@stocksense.in': { id: 2, name: 'Vikram Malhotra', role: 'Warehouse Staff', pass: 'staff123' },
  'priya.p@stocksense.in': { id: 3, name: 'Priya Patel', role: 'Logistics Specialist', pass: 'staff123' },
  'ananya.i@stocksense.in': { id: 4, name: 'Ananya Iyer', role: 'Procurement Manager', pass: 'admin123' },
  'admin@stocksense.in': { id: 5, name: 'StockSense Admin', role: 'Inventory Operations Lead', pass: 'admin123' },
  'user@stocksense.in': { id: 6, name: 'StockSense User', role: 'Warehouse Staff', pass: 'staff123' },
  'manager@stocksense.in': { id: 7, name: 'Warehouse Manager', role: 'Inventory Operations Lead', pass: 'admin123' },
  'staff@stocksense.in': { id: 8, name: 'Floor Operator', role: 'Warehouse Staff', pass: 'staff123' },
  'demo@stocksense.in': { id: 9, name: 'Demo Specialist', role: 'Inventory Operations Lead', pass: 'admin123' }
};

let memStore = {
  users: { ...DEFAULT_USERS },
  otpRecords: {},
  emailLogs: []
};

function initStore() {
  try {
    if (fs.existsSync(TMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TMP_FILE, 'utf8'));
      if (data && data.users) {
        memStore = data;
        for (const k of Object.keys(DEFAULT_USERS)) {
          if (!memStore.users[k]) {
            memStore.users[k] = DEFAULT_USERS[k];
          }
        }
      }
    }
  } catch (e) {}
}

function saveStore() {
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(memStore), 'utf8');
  } catch (e) {}
}

initStore();

function signToken(payload) {
  const jsonStr = JSON.stringify(payload);
  const b64 = Buffer.from(jsonStr).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [b64, sig] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET).update(b64).digest('base64url');
  if (sig !== expectedSig) return null;
  try {
    const jsonStr = Buffer.from(b64, 'base64url').toString('utf8');
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (!rc) return list;
  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

function setCookie(res, name, value, maxAgeSeconds) {
  const cookieStr = `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
  const existing = res.getHeader('Set-Cookie');
  if (!existing) {
    res.setHeader('Set-Cookie', cookieStr);
  } else if (Array.isArray(existing)) {
    res.setHeader('Set-Cookie', [...existing, cookieStr]);
  } else {
    res.setHeader('Set-Cookie', [existing, cookieStr]);
  }
}

function clearCookie(res, name) {
  const cookieStr = `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  const existing = res.getHeader('Set-Cookie');
  if (!existing) {
    res.setHeader('Set-Cookie', cookieStr);
  } else if (Array.isArray(existing)) {
    res.setHeader('Set-Cookie', [...existing, cookieStr]);
  } else {
    res.setHeader('Set-Cookie', [existing, cookieStr]);
  }
}

function logEmail(toEmail, subject, bodyText) {
  const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
  const entry = `[${ts}] TO: ${toEmail} | SUBJECT: ${subject}\n${bodyText}\n=======================================================\n`;
  memStore.emailLogs.push(entry);
  if (memStore.emailLogs.length > 50) memStore.emailLogs.shift();
  saveStore();
  try {
    fs.appendFileSync(EMAIL_LOG_FILE, entry, 'utf8');
  } catch (e) {}
}

module.exports = {
  memStore,
  saveStore,
  signToken,
  verifyToken,
  parseCookies,
  setCookie,
  clearCookie,
  logEmail,
  EMAIL_LOG_FILE,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
};
