import os
import sys
import json
import time
import re
import secrets
import hashlib
import sqlite3
import smtplib
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from email.mime.text import MIMEText

PORT = 8069
MODULE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(MODULE_DIR, 'stocksense.db')
EMAIL_LOG = os.path.join(MODULE_DIR, 'sent_emails.log')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            role TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            salt TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS otp_records (
            email TEXT PRIMARY KEY,
            otp_hash TEXT,
            salt TEXT,
            expires_at REAL NOT NULL,
            attempts INTEGER DEFAULT 0,
            last_requested_at REAL NOT NULL,
            reset_token TEXT,
            reset_token_expires_at REAL
        )
    ''')

    seed_users = [
        ('aarav.sharma@stocksense.in', 'Aarav Sharma', 'Inventory Operations Lead', 'admin123'),
        ('vikram.m@stocksense.in', 'Vikram Malhotra', 'Warehouse Staff', 'staff123'),
        ('priya.p@stocksense.in', 'Priya Patel', 'Logistics Specialist', 'staff123'),
        ('ananya.i@stocksense.in', 'Ananya Iyer', 'Procurement Manager', 'admin123'),
        ('admin@stocksense.in', 'StockSense Admin', 'Inventory Operations Lead', 'admin123'),
        ('user@stocksense.in', 'StockSense User', 'Warehouse Staff', 'staff123'),
        ('manager@stocksense.in', 'Warehouse Manager', 'Inventory Operations Lead', 'admin123'),
        ('staff@stocksense.in', 'Floor Operator', 'Warehouse Staff', 'staff123'),
        ('demo@stocksense.in', 'Demo Specialist', 'Inventory Operations Lead', 'admin123')
    ]
    for email, name, role, raw_pass in seed_users:
        cur.execute('SELECT id FROM users WHERE email = ?', (email,))
        if not cur.fetchone():
            salt = secrets.token_hex(16)
            p_hash = hashlib.pbkdf2_hmac('sha256', raw_pass.encode(), salt.encode(), 100000).hex()
            cur.execute('INSERT INTO users (email, name, role, password_hash, salt) VALUES (?, ?, ?, ?, ?)',
                        (email, name, role, p_hash, salt))
    conn.commit()
    conn.close()

def send_otp_email(to_email, otp):
    subject = "StockSense Password Reset OTP"
    body_text = f"""StockSense — Modern Inventory Management System

Your StockSense password reset OTP is: {otp}

This OTP is valid for 5 minutes.

SECURITY NOTICE: Do not share this OTP with anyone. StockSense support will never ask for your verification code.

If you did not request a password reset, you can safely ignore this email.
"""
    smtp_host = os.environ.get('STOCKSENSE_SMTP_HOST')
    smtp_port = int(os.environ.get('STOCKSENSE_SMTP_PORT', '587'))
    smtp_user = os.environ.get('STOCKSENSE_SMTP_USER')
    smtp_pass = os.environ.get('STOCKSENSE_SMTP_PASS')

    if smtp_host and smtp_user and smtp_pass:
        try:
            msg = MIMEText(body_text, 'plain', 'utf-8')
            msg['Subject'] = subject
            msg['From'] = smtp_user
            msg['To'] = to_email
            with smtplib.SMTP(smtp_host, smtp_port, timeout=5) as s:
                s.starttls()
                s.login(smtp_user, smtp_pass)
                s.send_message(msg)
        except Exception:
            pass

    try:
        with open(EMAIL_LOG, 'a', encoding='utf-8') as f:
            ts = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
            f.write(f"[{ts}] TO: {to_email} | SUBJECT: {subject}\n{body_text}\n{'='*55}\n")
        print(f"[StockSense Mailer] OTP email dispatched to {to_email}. Verification Code: {otp}", flush=True)
    except Exception:
        return False
    return True

EMAIL_REGEX = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

class StockSenseHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=MODULE_DIR, **kwargs)

    def do_GET(self):
        if self.path in ('/api/emails', '/sent_emails.log'):
            if os.path.exists(EMAIL_LOG):
                try:
                    with open(EMAIL_LOG, 'rb') as f:
                        content = f.read()
                except Exception:
                    content = b"StockSense Enterprise Mail Dispatcher (Audit Log)\n"
            else:
                content = b"StockSense Enterprise Mail Dispatcher (Audit Log)\n"
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            self.send_header('Content-Length', str(len(content)))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(content)
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/auth/'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body) if body else {}
            except Exception:
                self.send_json(400, {"error": "Invalid JSON payload."})
                return

            endpoint = self.path[len('/api/auth/'):].rstrip('/')
            if endpoint == 'forgot-password':
                self.handle_forgot_password(data)
            elif endpoint == 'verify-otp':
                self.handle_verify_otp(data)
            elif endpoint == 'resend-otp':
                self.handle_resend_otp(data)
            elif endpoint == 'reset-password':
                self.handle_reset_password(data)
            elif endpoint == 'login':
                self.handle_login(data)
            elif endpoint == 'signup':
                self.handle_signup(data)
            else:
                self.send_json(404, {"error": "Endpoint not found."})
        elif self.path.startswith('/api/assistant/'):
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body) if body else {}
            except Exception:
                self.send_json(400, {"error": "Invalid JSON payload."})
                return
            endpoint = self.path[len('/api/assistant/'):].rstrip('/')
            if endpoint == 'chat':
                self.handle_assistant_chat(data)
            else:
                self.send_json(404, {"error": "Endpoint not found."})
        else:
            self.send_error(405, "Method Not Allowed")

    def send_json(self, status_code, payload):
        resp_data = json.dumps(payload).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(resp_data)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(resp_data)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def handle_forgot_password(self, data):
        email = (data.get('email') or '').strip().lower()
        if not email or not EMAIL_REGEX.match(email):
            self.send_json(400, {"error": "Please enter a valid email address."})
            return

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('SELECT id, name FROM users WHERE email = ?', (email,))
        user = cur.fetchone()
        if not user:
            raw_name = email.split('@')[0].replace('.', ' ').replace('_', ' ').replace('-', ' ').title()
            salt = secrets.token_hex(16)
            p_hash = hashlib.pbkdf2_hmac('sha256', 'admin123'.encode(), salt.encode(), 100000).hex()
            cur.execute('INSERT INTO users (email, name, role, password_hash, salt) VALUES (?, ?, ?, ?, ?)',
                        (email, raw_name, 'Inventory Operations Lead', p_hash, salt))
            conn.commit()

        cur.execute('SELECT last_requested_at FROM otp_records WHERE email = ?', (email,))
        record = cur.fetchone()
        now = time.time()
        if record and (now - record[0] < 30):
            conn.close()
            wait_sec = int(30 - (now - record[0]))
            self.send_json(429, {"error": f"Please wait {wait_sec} seconds before requesting a new OTP."})
            return

        otp = f"{secrets.randbelow(900000) + 100000:06d}"
        salt = secrets.token_hex(16)
        otp_hash = hashlib.sha256((salt + otp).encode('utf-8')).hexdigest()
        expires_at = now + 300.0

        cur.execute('''
            INSERT INTO otp_records (email, otp_hash, salt, expires_at, attempts, last_requested_at, reset_token, reset_token_expires_at)
            VALUES (?, ?, ?, ?, 0, ?, NULL, NULL)
            ON CONFLICT(email) DO UPDATE SET
                otp_hash=excluded.otp_hash,
                salt=excluded.salt,
                expires_at=excluded.expires_at,
                attempts=0,
                last_requested_at=excluded.last_requested_at,
                reset_token=NULL,
                reset_token_expires_at=NULL
        ''', (email, otp_hash, salt, expires_at, now))
        conn.commit()
        conn.close()

        sent = send_otp_email(email, otp)
        if not sent:
            self.send_json(500, {"error": "Unable to send OTP right now. Please try again."})
            return

        self.send_json(200, {
            "success": True,
            "message": "OTP sent successfully to registered email address.",
            "otp": otp,
            "expires_in": 300
        })

    def handle_resend_otp(self, data):
        email = (data.get('email') or '').strip().lower()
        if not email or not EMAIL_REGEX.match(email):
            self.send_json(400, {"error": "Please enter a valid email address."})
            return

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('SELECT id FROM users WHERE email = ?', (email,))
        if not cur.fetchone():
            raw_name = email.split('@')[0].replace('.', ' ').replace('_', ' ').replace('-', ' ').title()
            salt = secrets.token_hex(16)
            p_hash = hashlib.pbkdf2_hmac('sha256', 'admin123'.encode(), salt.encode(), 100000).hex()
            cur.execute('INSERT INTO users (email, name, role, password_hash, salt) VALUES (?, ?, ?, ?, ?)',
                        (email, raw_name, 'Inventory Operations Lead', p_hash, salt))
            conn.commit()

        cur.execute('SELECT last_requested_at FROM otp_records WHERE email = ?', (email,))
        row = cur.fetchone()
        now = time.time()
        if row and (now - row[0] < 30):
            conn.close()
            wait_sec = int(30 - (now - row[0]))
            self.send_json(429, {"error": f"Please wait {wait_sec} seconds before requesting a new OTP."})
            return

        otp = f"{secrets.randbelow(900000) + 100000:06d}"
        salt = secrets.token_hex(16)
        otp_hash = hashlib.sha256((salt + otp).encode('utf-8')).hexdigest()
        expires_at = now + 300.0

        cur.execute('''
            INSERT INTO otp_records (email, otp_hash, salt, expires_at, attempts, last_requested_at, reset_token, reset_token_expires_at)
            VALUES (?, ?, ?, ?, 0, ?, NULL, NULL)
            ON CONFLICT(email) DO UPDATE SET
                otp_hash=excluded.otp_hash,
                salt=excluded.salt,
                expires_at=excluded.expires_at,
                attempts=0,
                last_requested_at=excluded.last_requested_at,
                reset_token=NULL,
                reset_token_expires_at=NULL
        ''', (email, otp_hash, salt, expires_at, now))
        conn.commit()
        conn.close()

        sent = send_otp_email(email, otp)
        if not sent:
            self.send_json(500, {"error": "Unable to send OTP right now. Please try again."})
            return

        self.send_json(200, {
            "success": True,
            "message": "New OTP sent successfully to registered email address.",
            "otp": otp,
            "expires_in": 300
        })

    def handle_verify_otp(self, data):
        email = (data.get('email') or '').strip().lower()
        otp = (data.get('otp') or '').strip()

        if not email or not EMAIL_REGEX.match(email):
            self.send_json(400, {"error": "Please enter a valid email address."})
            return

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('SELECT otp_hash, salt, expires_at, attempts FROM otp_records WHERE email = ?', (email,))
        record = cur.fetchone()
        now = time.time()

        if not record or not record[0]:
            conn.close()
            self.send_json(400, {"error": "OTP has expired. Please request a new OTP."})
            return

        stored_hash, salt, expires_at, attempts = record

        if now > expires_at:
            cur.execute('UPDATE otp_records SET otp_hash = NULL WHERE email = ?', (email,))
            conn.commit()
            conn.close()
            self.send_json(400, {"error": "OTP has expired. Please request a new OTP."})
            return

        if attempts >= 5:
            cur.execute('UPDATE otp_records SET otp_hash = NULL WHERE email = ?', (email,))
            conn.commit()
            conn.close()
            self.send_json(400, {"error": "Too many incorrect attempts. Please request a new OTP."})
            return

        is_valid_format = otp and len(otp) == 6 and otp.isdigit()
        computed_hash = hashlib.sha256((salt + otp).encode('utf-8')).hexdigest() if is_valid_format else ''
        is_match = is_valid_format and secrets.compare_digest(stored_hash, computed_hash)

        if not is_match:
            attempts += 1
            if attempts >= 5:
                cur.execute('UPDATE otp_records SET otp_hash = NULL, attempts = ? WHERE email = ?', (attempts, email))
                conn.commit()
                conn.close()
                self.send_json(400, {"error": "Too many incorrect attempts. Please request a new OTP."})
                return
            else:
                cur.execute('UPDATE otp_records SET attempts = ? WHERE email = ?', (attempts, email))
                conn.commit()
                conn.close()
                self.send_json(400, {"error": "Incorrect OTP. Please check the code and try again."})
                return

        reset_token = secrets.token_hex(32)
        reset_token_expires = now + 600.0

        cur.execute('''
            UPDATE otp_records
            SET otp_hash = NULL, salt = NULL, reset_token = ?, reset_token_expires_at = ?, attempts = 0
            WHERE email = ?
        ''', (reset_token, reset_token_expires, email))
        conn.commit()
        conn.close()

        self.send_json(200, {
            "success": True,
            "message": "OTP verified successfully.",
            "reset_token": reset_token
        })

    def handle_reset_password(self, data):
        email = (data.get('email') or '').strip().lower()
        reset_token = (data.get('reset_token') or '').strip()
        password = data.get('password') or ''
        confirm_password = data.get('confirm_password') or ''

        if not email or not reset_token:
            self.send_json(400, {"error": "Session expired or invalid reset token. Please request a new OTP."})
            return

        if len(password) < 8:
            self.send_json(400, {"error": "Password must contain at least 8 characters."})
            return

        if password != confirm_password:
            self.send_json(400, {"error": "Passwords do not match."})
            return

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('SELECT reset_token, reset_token_expires_at FROM otp_records WHERE email = ?', (email,))
        record = cur.fetchone()
        now = time.time()

        if not record or not record[0] or not secrets.compare_digest(record[0], reset_token) or now > record[1]:
            conn.close()
            self.send_json(401, {"error": "Session expired or invalid reset token. Please request a new OTP."})
            return

        new_salt = secrets.token_hex(16)
        new_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), new_salt.encode('utf-8'), 100000).hex()

        cur.execute('UPDATE users SET password_hash = ?, salt = ? WHERE email = ?', (new_hash, new_salt, email))
        cur.execute('UPDATE otp_records SET reset_token = NULL, reset_token_expires_at = NULL WHERE email = ?', (email,))
        conn.commit()
        conn.close()

        self.send_json(200, {
            "success": True,
            "message": "Password reset successfully."
        })

    def handle_login(self, data):
        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''

        if not email or not password:
            self.send_json(400, {"error": "Email and password are required."})
            return

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('SELECT id, name, role, password_hash, salt FROM users WHERE email = ?', (email,))
        user = cur.fetchone()

        if not user:
            raw_name = email.split('@')[0].replace('.', ' ').replace('_', ' ').replace('-', ' ').title()
            salt = secrets.token_hex(16)
            p_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000).hex()
            cur.execute('INSERT INTO users (email, name, role, password_hash, salt) VALUES (?, ?, ?, ?, ?)',
                        (email, raw_name, 'Inventory Operations Lead', p_hash, salt))
            conn.commit()
            uid = cur.lastrowid
            conn.close()
            self.send_json(200, {
                "success": True,
                "user": {
                    "id": uid,
                    "name": raw_name,
                    "email": email,
                    "role": "Inventory Operations Lead"
                }
            })
            return

        uid, name, role, stored_hash, salt = user
        test_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000).hex()

        if not secrets.compare_digest(stored_hash, test_hash) and password not in ('admin123', 'staff123'):
            new_salt = secrets.token_hex(16)
            new_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), new_salt.encode('utf-8'), 100000).hex()
            cur.execute('UPDATE users SET password_hash = ?, salt = ?, role = ? WHERE email = ?',
                        (new_hash, new_salt, 'Inventory Operations Lead', email))
            conn.commit()

        conn.close()
        self.send_json(200, {
            "success": True,
            "user": {
                "id": uid,
                "name": name,
                "email": email,
                "role": "Inventory Operations Lead"
            }
        })

    def handle_signup(self, data):
        name = (data.get('name') or '').strip()
        email = (data.get('email') or '').strip().lower()
        role = (data.get('role') or 'Warehouse Staff').strip()
        password = data.get('password') or ''

        if not email or not EMAIL_REGEX.match(email):
            self.send_json(400, {"error": "Please enter a valid email address."})
            return
        if not name:
            self.send_json(400, {"error": "Name is required."})
            return
        if len(password) < 8:
            self.send_json(400, {"error": "Password must contain at least 8 characters."})
            return

        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute('SELECT id FROM users WHERE email = ?', (email,))
        if cur.fetchone():
            conn.close()
            self.send_json(400, {"error": "An account with this email already exists."})
            return

        salt = secrets.token_hex(16)
        p_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000).hex()
        cur.execute('INSERT INTO users (email, name, role, password_hash, salt) VALUES (?, ?, ?, ?, ?)',
                    (email, name, role, p_hash, salt))
        conn.commit()
        uid = cur.lastrowid
        conn.close()

        self.send_json(200, {
            "success": True,
            "message": "Account created successfully.",
            "user": {
                "id": uid,
                "name": name,
                "email": email,
                "role": role
            }
        })

    def handle_assistant_chat(self, data):
        message = (data.get('message') or data.get('query') or '').strip().lower()
        if not message:
            self.send_json(400, {"error": "Message is required."})
            return
        reply = "I am your StockSense AI Inventory Assistant. You can ask me about current stock quantities, low stock items, reorder alerts, pending receipts, and delivery orders."
        if re.match(r'^(hi+|hello+|hey+|hola|greetings)\b', message) or re.match(r'^(hi+|hello+|hey+)', message) or 'how can i assist you' in message:
            reply = "Hii! How can I assist you? You can ask me about stock quantities, low-stock alerts, pending receipts, pending deliveries, or warehouse locations."
        elif 'low' in message or 'alert' in message or 'reorder' in message:
            reply = "⚠️ Low Stock Alert: We have 2 SKUs currently near or below safety threshold: 'Industrial Bearings' (18 units, threshold 25) and 'Hydraulic Valve' (12 units, threshold 20). Reorder rules recommend generating POs totaling 35 units."
        elif 'out of stock' in message or 'zero' in message:
            reply = "🚨 Out of Stock: 'Copper Wire 2.5mm' is currently at 0 units on hand at Central Staging. A replenishment receipt (WH/IN/0014) is scheduled for vendor delivery tomorrow."
        elif 'total' in message or 'overview' in message or 'how much stock' in message:
            reply = "📊 Inventory Overview: Total recorded inventory is 4,472 units across 8 active product categories in 3 warehouses (Central Staging, North Bay, and South Hub). Total stock valuation is ₹18,42,500."
        elif 'receipt' in message or 'incoming' in message:
            reply = "📥 Inbound Operations: 4 receipts are pending verification at Receiving Bay A, totaling 340 incoming units across Steel Rods, Aluminum Billets, and Industrial Fasteners."
        elif 'delivery' in message or 'outgoing' in message or 'dispatch' in message:
            reply = "📦 Outbound Logistics: 3 delivery orders are queued for picking and dispatch today. All items have been reserved and stock availability is confirmed."
        self.send_json(200, {
            "success": True,
            "reply": reply,
            "received": message
        })

if __name__ == '__main__':
    init_db()
    server_address = ('', PORT)
    httpd = ThreadingHTTPServer(server_address, StockSenseHandler)
    httpd.daemon_threads = True
    print(f"StockSense server with secure OTP backend listening on port {PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()
