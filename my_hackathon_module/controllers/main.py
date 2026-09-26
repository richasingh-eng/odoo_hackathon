import json
from odoo import http
from odoo.http import request

class StockSenseController(http.Controller):

    @http.route(['/stocksense', '/inventory', '/my_hackathon_module'], type='http', auth='public', website=True)
    def render_inventory_app(self, **kw):
        return request.render('my_hackathon_module.inventory_app_template', {})

    @http.route('/api/products', type='json', auth='public', methods=['GET', 'POST'], csrf=False)
    def get_products(self, **kw):
        model_name = 'stocksense.product' if 'stocksense.product' in request.env else 'hackathon.product'
        products = request.env[model_name].sudo().search([]) if model_name in request.env else []
        if not products:
            return [{
                "product_code": "ST-001",
                "product_name": "Office Chair",
                "category": "Furniture",
                "uom": "Units",
                "quantity_on_hand": 100
            }]
        return [{
            "product_code": p.product_code,
            "product_name": p.product_name,
            "category": p.category,
            "uom": p.uom,
            "quantity_on_hand": p.quantity_on_hand
        } for p in products]

    @http.route('/api/operations', type='json', auth='public', methods=['GET', 'POST'], csrf=False)
    def get_operations(self, **kw):
        model_name = 'stocksense.stock.operation' if 'stocksense.stock.operation' in request.env else 'hackathon.stock.operation'
        ops = request.env[model_name].sudo().search([]) if model_name in request.env else []
        if not ops:
            return [{
                "reference_no": "IN/0001",
                "operation_type": "receipt",
                "partner_name": "ABC Suppliers",
                "product_code": "ST-001",
                "quantity": 20,
                "status": "draft"
            }]
        return [{
            "reference_no": op.reference_no,
            "operation_type": op.operation_type,
            "partner_name": op.partner_name,
            "product_code": op.product_code,
            "quantity": op.quantity,
            "status": op.status
        } for op in ops]
