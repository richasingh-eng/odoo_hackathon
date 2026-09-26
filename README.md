# StockSense — Modern Inventory Management System (IMS)

> **Enterprise Warehouse Operations & Odoo Hackathon Module**  
> Visual Reference: Modern Dark/Light Design System  
> Data Contract: Aligned with `contract_mock.json` and Odoo 16/17/18/20 Module Specs

---

## 🏗️ System Architecture & Workflow Flowcharts

### 1. End-to-End System Architecture

```mermaid
flowchart TD
    subgraph Client["Client / Browser Layer (Port 8069)"]
        UI["StockSense Web Application (Single-Page App)"]
        AuthViews["Auth Views<br/>Login / Signup / OTP Password Reset"]
        DashViews["Dashboard & Operations<br/>KPI Cards / Products / Receipts / Deliveries"]
        AIWidget["AI Inventory Assistant<br/>(Floating Widget & Natural Language Queries)"]
    end

    subgraph BackendServer["Python Backend Server (server.py)"]
        ThreadServer["ThreadingHTTPServer (Port 8069)"]
        AuthRouter["Authentication Controller<br/>/api/auth/login, signup, forgot-password, verify-otp, reset-password"]
        AIRouter["Assistant Controller<br/>/api/assistant/chat"]
        StaticRouter["Static & Asset Router<br/>index.html, styles.css, app.js"]
    end

    subgraph StorageLayer["Data & Persistence Layer"]
        DB[("SQLite Database: stocksense.db<br/>users, otp_records")]
        LogFile["Email Dispatch Log: sent_emails.log<br/>Hashed OTP Audit Records"]
        StateData["In-Memory Reactive Ledger<br/>8 SKUs, 3 Hubs, 14 Transaction Records"]
    end

    subgraph OdooIntegration["Odoo Module Integration (my_hackathon_module)"]
        OdooModels["Odoo ORM Models<br/>stocksense.product<br/>stocksense.stock.operation<br/>stocksense.receipt<br/>stocksense.category"]
        OdooSecurity["Access Control: ir.model.access.csv<br/>CRUD rights for base.group_user"]
        OdooViews["QWeb Templates & Views<br/>views.xml, templates.xml, login_signup.xml, stocksense_views.xml"]
        OdooControllers["Odoo Web Controllers<br/>/stocksense, /api/products, /api/operations"]
    end

    UI --> AuthViews
    UI --> DashViews
    UI --> AIWidget

    AuthViews -->|HTTP POST JSON| AuthRouter
    AIWidget -->|HTTP POST JSON| AIRouter
    DashViews -->|HTTP GET / POST| StaticRouter

    AuthRouter -->|PBKDF2 SHA-256 Hashing| DB
    AuthRouter -->|Generate 6-digit secure OTP| LogFile
    AIRouter -->|Real-time stock queries| StateData

    ThreadServer --> AuthRouter
    ThreadServer --> AIRouter
    ThreadServer --> StaticRouter

    OdooControllers --> OdooModels
    OdooModels --> OdooSecurity
    OdooViews --> OdooControllers
```

---

### 2. Warehouse Operations Lifecycle Flow

```mermaid
flowchart LR
    Vendor["Vendor Consignment"] -->|Step 1: Receipt| Staging["Main Staging / Inbound"]
    Staging -->|Auto-increment stock| Inventory["Stock on Hand (+Qty)"]
    Inventory -->|Step 2: Internal Transfer| Bay["Assembly Bay / Regional Hubs"]
    Bay -->|Step 3: Delivery Order| Dispatch["Picking ➔ Packing ➔ Dispatch"]
    Dispatch -->|Validation Check: Qty <= Stock| Customer["Customer / Project Delivery (-Qty)"]
    Inventory -.->|Step 4: Physical Count Audit| Adjustment["Stock Adjustment (+/- Discrepancy)"]
    Adjustment -->|Reason Code & Diff Log| Ledger[("Move History & Audit Ledger")]
    Dispatch --> Ledger
    Staging --> Ledger
    Bay --> Ledger
```

---

### 3. Production OTP-Based Password Reset Flow

```mermaid
flowchart TD
    Start["User clicks 'Forgot Password?'"] --> InputEmail["Enter registered email address"]
    InputEmail --> ValidateEmail{"Valid format & registered?"}
    ValidateEmail -- No --> ErrEmail["Show error: The email address or account details are incorrect."]
    ValidateEmail -- Yes --> Cooldown{"Within 30s cooldown?"}
    Cooldown -- Yes --> ErrRate["Show error: Please wait X seconds before requesting a new OTP."]
    Cooldown -- No --> GenOTP["Generate 6-digit cryptographically secure OTP"]
    GenOTP --> HashOTP["Salt & Hash OTP (SHA-256)<br/>Save to SQLite with 5-minute expiry"]
    HashOTP --> SendEmail["Dispatch OTP to user email / log to sent_emails.log"]
    SendEmail --> EnterOTP["User enters 6-digit OTP on /#/verify-otp"]
    EnterOTP --> VerifyAttempt{"Attempts < 5 and Not Expired?"}
    VerifyAttempt -- Exceeded / Expired --> InvalidateOTP["Invalidate OTP, prompt user to request new code"]
    VerifyAttempt -- Valid & Matches --> IssueToken["Generate single-use 10-minute Reset Token"]
    IssueToken --> NewPassView["User enters new password on /#/create-password"]
    NewPassView --> SavePass["Hash password (PBKDF2 100,000 rounds)<br/>Invalidate Reset Token<br/>Redirect to Login"]
```

---

### 4. AI Inventory Assistant Query Flow

```mermaid
flowchart TD
    UserQuery["User asks natural language question<br/>(e.g., 'Which products are low in stock?')"] --> Guardrails{"Check Guardrails"}
    Guardrails -- Modifying attempt --> ReadOnlyNotice["Explain read-only role & prompt user to use UI action buttons"]
    Guardrails -- Sensitive data query --> SecurityBlock["Refuse to disclose credentials or tokens"]
    Guardrails -- Valid inventory query --> QueryParser["Extract intent, entity, SKU, status filter"]
    QueryParser --> LiveState["Query Live State & Ledger Data"]
    LiveState --> FormattedAnswer["Generate concise, factual, formatted markdown response"]
    FormattedAnswer --> ChatBubble["Render in Assistant chat panel with suggested chips"]
```

---

## 🚀 Quick Start / How to Run & Preview

### Option A: Local Python Backend (Full Features with OTP & AI Assistant)
Run from inside this directory:
```powershell
python my_hackathon_module/server.py
```
Open your browser at:
```
http://localhost:8069/
```
- Real OTP password reset flow with SQLite persistence.
- Built-in live mock data & seed users:
  - `aarav.sharma@stocksense.in` (Inventory Operations Lead)
  - `vikram.m@stocksense.in` (Warehouse Staff)
  - `priya.p@stocksense.in` (Logistics Specialist)
  - `ananya.i@stocksense.in` (Procurement Manager)
- OTP emails are recorded in `my_hackathon_module/sent_emails.log`.

### Option B: Standalone File (Instant Browser Preview)
Open `my_hackathon_module/index.html` directly in any web browser without needing any server:
```powershell
start my_hackathon_module/index.html
```

### Option C: Odoo Module Installation
If installing inside an Odoo 16/17/18/20 environment:
1. Ensure `odoo_hackathon` or `my_hackathon_module` is in your `addons_path` in `odoo.conf`.
2. Update Apps list and install **StockSense – Inventory Management System**.
3. Access the full web application at `http://localhost:8069/stocksense` or via the top menu **StockSense IMS**.

---

## 📦 Directory Structure

```
my_hackathon_module/
├── README.md                    # Comprehensive documentation with flowcharts
├── index.html                   # Standalone self-contained web app (double-click preview)
├── standalone.html              # Portable standalone bundle
├── styles.css                   # Modern CSS design system (Inter, Plus Jakarta Sans, JetBrains Mono)
├── app.js                       # Frontend state machine, router, validators & simulation runner
├── server.py                    # Threading backend server with OTP auth & AI assistant API
├── stocksense.db                # SQLite database storing users, password hashes, and OTP records
├── sent_emails.log              # Audit log for dispatched OTP emails
├── contract_mock.json           # Data contract between backend and frontend
├── __manifest__.py              # Odoo module manifest with views, assets, and metadata
├── __init__.py                  # Python package initialization
├── models/
│   ├── __init__.py
│   ├── category.py              # StockSense category model
│   ├── product.py               # StockSense product model & Hackathon alias
│   ├── stock_picking.py         # Stock operations with automatic inventory validations
│   └── stock_receipt.py         # Stock receipts with automatic intake logic
├── controllers/
│   ├── __init__.py
│   └── main.py                  # HTTP controllers (/stocksense, /api/products, /api/operations)
├── views/
│   ├── views.xml                # Odoo backend menus, tree, and form views
│   ├── stocksense_views.xml     # Odoo 18/20 modern list and form views
│   ├── templates.xml            # QWeb frontend website template
│   └── login_signup.xml         # Modern login and signup templates
├── security/
│   └── ir.model.access.csv      # Access control lists for internal users
├── stocksense/                  # Modular backend package
│   ├── __init__.py
│   ├── __manifest__.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── category.py
│   │   ├── product.py
│   │   ├── stock_picking.py
│   │   ├── stock_receipt.py
│   │   └── models.py
│   ├── security/
│   │   └── ir.model.access.csv
│   └── views/
│       └── stocksense_views.xml
└── static/
    ├── description/
    │   └── index.html           # Odoo Apps Store module showcase
    └── src/
        ├── css/
        │   ├── styles.css       # Modular CSS stylesheet
        │   └── login_signup.css # Auth styles
        ├── js/
        │   └── app.js           # Modular JS application logic
        └── index.html           # Modular web app entry point
```

---

## 🎨 Key Features & Capabilities

1. **Warehouse Manager Control Tower**:
   - Real-time KPI summary: Total stock on hand, Low Stock items, Out of Stock items, Pending Receipts, Pending Deliveries, Internal Transfers.
   - Chronological operations ledger with search, category filtering, warehouse hub filtering, and status filtering.
2. **Interactive 4-Step Inventory Lifecycle Walkthrough**:
   - 1-Click Simulation Runner (`window.runDemoLifecycle()`) demonstrating:
     1. Inbound vendor receipt (+100 units)
     2. Intra-warehouse transfer (30 units relocated)
     3. Customer delivery order validation (-20 units dispatched)
     4. Physical inventory cycle count adjustment (-3 damaged units)
3. **Strict Stock Validation**:
   - Deliveries cannot exceed physical quantity on hand, preventing negative inventory.
   - Validation buttons automatically update product quantities, timestamps, and audit records.
4. **Production OTP-Based Password Reset**:
   - Secure forgot password flow with cryptographic salting, 5-minute validity, 30s resend rate-limiting, and 5-attempt brute-force protection.
5. **AI Inventory Assistant**:
   - Compact floating button in the bottom right corner.
   - Real-time contextual intelligence on stock levels, reorder alerts, pending shipments, and warehouse locations.
