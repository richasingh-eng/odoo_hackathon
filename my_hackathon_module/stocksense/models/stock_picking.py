from odoo import models, fields, api
from odoo.exceptions import ValidationError

class StockSensePicking(models.Model):
    _name = 'stocksense.stock.picking'
    _description = 'StockSense Stock Operations'

    reference_no = fields.Char(string='Reference No', required=True, default='NEW')
    operation_type = fields.Selection([
        ('receipt', 'Receipt'),
        ('delivery', 'Delivery')
    ], string='Operation Type', required=True, default='receipt')
    partner_name = fields.Char(string='Partner Name', required=True)
    product_code = fields.Char(string='Product Code', required=True)
    quantity = fields.Float(string='Quantity', required=True, default=1.0)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('done', 'Done')
    ], string='Status', default='draft')

    def action_validate(self):
        for record in self:
            product = self.env['stocksense.product'].search([('product_code', '=', record.product_code)], limit=1)
            
            if not product:
                raise ValidationError(f"Product with code '{record.product_code}' not found!")

            if record.operation_type == 'receipt':
                # Receipt Automation: Add incoming stock
                product.quantity_on_hand += record.quantity
            elif record.operation_type == 'delivery':
                # Stock Validation: Block deliveries if requested quantity exceeds available stock
                if record.quantity > product.quantity_on_hand:
                    raise ValidationError(f"Insufficient stock for {product.name}! Available: {product.quantity_on_hand}, Requested: {record.quantity}")
                product.quantity_on_hand -= record.quantity

            record.status = 'done'