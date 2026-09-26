from odoo import models, fields, api
from odoo.exceptions import UserError

class StocksenseReceipt(models.Model):
    _name = 'stocksense.receipt'
    _description = 'Stock Receipt (Inbound)'

    name = fields.Char(string='Receipt Reference', required=True, default=lambda self: self.env['ir.sequence'].next_by_code('stocksense.receipt') or 'REC/0001')
    state = fields.Selection([
        ('draft', 'Draft'),
        ('done', 'Done')
    ], string='Status', default='draft')
    
    line_ids = fields.One2many('stocksense.receipt.line', 'receipt_id', string='Receipt Lines')

    def action_done(self):
        for receipt in self:
            if receipt.state == 'done':
                raise UserError("This receipt is already processed and marked as Done.")
            for line in receipt.line_ids:
                if line.product_id:
                    line.product_id.quantity_on_hand += line.quantity
            receipt.state = 'done'

class StocksenseReceiptLine(models.Model):
    _name = 'stocksense.receipt.line'
    _description = 'Stock Receipt Line'

    receipt_id = fields.Many2one('stocksense.receipt', string='Receipt Reference', ondelete='cascade')
    product_id = fields.Many2one('stocksense.product', string='Product', required=True)
    quantity = fields.Float(string='Received Quantity', default=1.0, required=True)
