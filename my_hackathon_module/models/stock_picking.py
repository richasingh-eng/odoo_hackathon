from odoo import models, fields, api
from odoo.exceptions import ValidationError

class StocksenseStockOperation(models.Model):
    _name = 'stocksense.stock.operation'
    _description = 'StockSense Stock Operation'

    reference_no = fields.Char(string='Reference No', required=True)
    operation_type = fields.Selection([
        ('receipt', 'Receipt'),
        ('delivery', 'Delivery')
    ], string='Operation Type', required=True)
    partner_name = fields.Char(string='Partner Name')
    product_code = fields.Char(string='Product Code', required=True)
    quantity = fields.Integer(string='Quantity', required=True, default=1)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('done', 'Done')
    ], string='Status', default='draft', required=True)

    @api.model
    def create(self, vals):
        record = super(StocksenseStockOperation, self).create(vals)
        record._process_stock_logic()
        return record

    def write(self, vals):
        res = super(StocksenseStockOperation, self).write(vals)
        if 'status' in vals:
            for record in self:
                record._process_stock_logic()
        return res

    def _process_stock_logic(self):
        for record in self:
            if getattr(record, 'is_processed', False):
                continue
            product = self.env['stocksense.product'].search([('product_code', '=', record.product_code)], limit=1)
            if not product:
                continue
            if record.status == 'done':
                if record.operation_type == 'receipt':
                    product.quantity_on_hand += record.quantity
                elif record.operation_type == 'delivery':
                    if product.quantity_on_hand < record.quantity:
                        raise ValidationError(f"Stock Validation Failed! Available stock ({product.quantity_on_hand}) is less than requested ({record.quantity}).")
                    product.quantity_on_hand -= record.quantity

class HackathonStockOperation(models.Model):
    _name = 'hackathon.stock.operation'
    _inherit = 'stocksense.stock.operation'
    _description = 'Hackathon Stock Operation Alias'
