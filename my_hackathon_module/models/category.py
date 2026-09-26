from odoo import models, fields

class StocksenseCategory(models.Model):
    _name = 'stocksense.category'
    _description = 'StockSense Category'

    name = fields.Char(string='Category Name', required=True)
    product_ids = fields.One2many('stocksense.product', 'category_id', string='Products')
