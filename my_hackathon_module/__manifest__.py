{
    'name': 'StockSense – Inventory Management System',
    'version': '1.0',
    'category': 'Inventory',
    'summary': 'Custom Inventory Management Module for Odoo Hackathon',
    'depends': ['base', 'web', 'auth_signup'],
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'views/login_signup.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'my_hackathon_module/static/src/css/login_signup.css',
        ],
        'web.assets_backend': [
            'my_hackathon_module/static/src/css/styles.css',
            'my_hackathon_module/static/src/js/app.js',
        ],
    },
    'installable': True,
    'application': True,
}