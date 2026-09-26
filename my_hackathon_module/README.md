# StockSense — Odoo Hackathon Inventory Management Module

> **Frontend Module Implementation**  
> Role: Frontend Engineer  
> Visual Reference: [Excalidraw Design Mockup](https://link.excalidraw.com/l/65VNwvy7c4X/3ENvQFu9o8R)  
> Data Contract: Aligned with `contract_mock.json`

---

## 🚀 Quick Start / How to Run & Preview

### Option A: Direct Browser Preview (Instant, Zero Dependencies)
Simply open the standalone file directly in any modern web browser:
```
my_hackathon_module/index.html
```
Double-click it in Windows File Explorer or right-click -> "Open with Google Chrome" / "Microsoft Edge". Everything (styles, icons, client-side persistence, workflow state machines, and interactive walkthrough) is self-contained.

### Option B: Local Web Server
Run from inside this folder:
```powershell
cd C:\Users\User\Odoo-hackathon\odoo_hackathon\my_hackathon_module
python -m http.server 8080
```
Then visit: `http://localhost:8080/`

### Option C: Odoo Module Installation
If running inside an Odoo 16/17/18 environment:
1. Add `odoo_hackathon` to your `addons_path`.
2. Update Apps list and install **"StockSense — Modern Inventory Management System"**.
3. Access the web app at `http://localhost:8069/stocksense` or via the top menu **StockSense IMS**.

---

## 📦 Directory Structure

```
my_hackathon_module/
├── index.html                   # Standalone self-contained web app (Instant double-click preview)
├── standalone.html              # Portable standalone bundle
├── styles.css                   # Modern CSS design system (Inter, Plus Jakarta Sans, JetBrains Mono)
├── app.js                       # Frontend state machine, router, validators & simulation runner
├── contract_mock.json           # Data contract between backend and frontend
├── __manifest__.py              # Odoo module manifest with views, assets, and metadata
├── __init__.py                  # Python package initialization
├── models/
│   ├── __init__.py
│   └── models.py                # Aligned Odoo models (product, stock_operation)
├── controllers/
│   ├── __init__.py
│   └── main.py                  # HTTP controllers (/stocksense, /api/products, /api/operations)
├── views/
│   ├── views.xml                # Odoo backend menus, tree, and form views
│   └── templates.xml            # QWeb frontend website template
├── security/
│   └── ir.model.access.csv      # Access control lists
└── static/
    ├── description/
    │   └── index.html           # Odoo Apps Store module showcase
    └── src/
        ├── css/styles.css       # Modular CSS stylesheet
        ├── js/app.js            # Modular JS application logic
        └── index.html           # Modular web app entry point
```

---

## 🎨 Key UI/UX Highlights (Human-Crafted Polish)

1. **Excalidraw Visual Fidelity**:
   - Multi-warehouse facility cards with *"1 Critical Items >"* badges.
   - Collapsible location tree: `Warehouse → Zone → Rack → Bin` with capacity bars and `[good]`, `[low]`, `[critical]` badges.
   - Pinned `+ Add New Item` quick action in the sidebar.
2. **Interactive 4-Step Inventory Lifecycle Walkthrough**:
   - Banner on the Dashboard with a **1-Click Simulation Runner** (`window.runDemoLifecycle()`) executing:
     1. Vendor Receipt (`+100` units received)
     2. Internal Warehouse Transfer (`30` units relocated)
     3. Customer Delivery (`-20` units dispatched)
     4. Physical Inventory Adjustment (`-3` damaged units written off)
   - All reflected live across warehouse meters and the Move History audit ledger.
3. **Live Difference Calculation Box**:
   - Inventory adjustments calculate recorded vs. counted quantity in real time with dynamic color feedback (green for surplus, amber for shrinkage, red for zero count).
4. **Data Contract Compliance**:
   - Default seed data includes `ST-001` (*Office Chair*, *Furniture*, *100 Units*) and operation `IN/0001` (*Receipt*, *ABC Suppliers*, *Draft*) directly as specified in `contract_mock.json`.
