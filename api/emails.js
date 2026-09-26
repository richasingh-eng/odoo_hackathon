const fs = require('fs');
const { memStore, EMAIL_LOG_FILE } = require('./_shared');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let text = '';
  if (fs.existsSync(EMAIL_LOG_FILE)) {
    try {
      text = fs.readFileSync(EMAIL_LOG_FILE, 'utf8');
    } catch (e) {}
  }

  if (!text && memStore.emailLogs && memStore.emailLogs.length > 0) {
    text = memStore.emailLogs.join('');
  }

  if (!text) {
    text = "StockSense Enterprise Mail Dispatcher (Audit Log)\nNo password reset emails dispatched in this session yet.\n";
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  return res.status(200).send(text);
};
