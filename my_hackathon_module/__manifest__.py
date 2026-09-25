{
    'name': 'Hackathon Custom Module',
    'version': '1.0',
    'category': 'Custom',
    'summary': 'Custom module for Odoo Hackathon',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
    ],
    'installable': True,
    'application': True,
}