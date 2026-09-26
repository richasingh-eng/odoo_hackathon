from odoo import models, fields

class StocksenseProduct(models.Model):
    _name = 'stocksense.product'
    _description = 'StockSense Product'

    product_code = fields.Char(string='Product Code', required=True)
    product_name = fields.Char(string='Product Name', required=True)
    category_id = fields.Many2one('stocksense.category', string='Category', ondelete='cascade')
    uom = fields.Char(string='Unit of Measure', default='Units')
    quantity_on_hand = fields.Integer(string='Quantity on Hand', default=0)
    _product_code_uniq = models.Constraint(
        'unique(product_code)',
        'The Product Code must be unique!'
    )