{
    'name': 'StockSense — Modern Inventory Management System',
    'version': '1.0.0',
    'category': 'Inventory/Inventory',
    'summary': 'Digitized modern inventory operations with real-time stock tracking, Excalidraw UI fidelity, and full lifecycle simulation',
    'description': """
StockSense — Modern Inventory Management System
===============================================
A modular, human-crafted Inventory Management System (IMS) designed for the Odoo Hackathon.

Features:
- Live Inventory Dashboard with 6 KPIs and quick action shortcuts
- Excalidraw-faithful multi-warehouse facility hierarchy (Warehouse -> Zone -> Rack -> Bin)
- Product Catalog with stock status indicators and low-stock threshold alerts
- Inbound Vendor Receipts (Draft -> Waiting -> Ready -> Done)
- Outbound Customer Deliveries (Pick -> Pack -> Validate)
- Internal Warehouse Transfers preserving inventory integrity
- Cycle Count Physical Adjustments with real-time difference calculation box
- Move History & Audit Ledger with CSV export
- 4-Step Interactive Lifecycle Walkthrough & 1-Click Simulation Runner
- Zero-backend client-side persistence with localStorage and REST API adapters
    """,
    'author': 'Hackathon Frontend Team',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'my_hackathon_module/static/src/css/styles.css',
            'my_hackathon_module/static/src/js/app.js',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
