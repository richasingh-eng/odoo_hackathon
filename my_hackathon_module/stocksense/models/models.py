from odoo import models, fields

class StockCategory(models.Model):
    _name = 'stocksense.category'
    _description = 'Stock Category'

    name = fields.Char(string='Category Name', required=True)

class StockProduct(models.Model):
    _name = 'stocksense.product'
    _description = 'Stock Product'

    name = fields.Char(string='Product Name', required=True)
    category_id = fields.Many2one('stocksense.category', string='Category')