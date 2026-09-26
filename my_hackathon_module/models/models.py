# -*- coding: utf-8 -*-
from odoo import models, fields, api

class HackathonCustomModel(models.Model):
    _name = 'hackathon.custom.model'
    _description = 'Hackathon Custom Base Model'

    name = fields.Char(string='Name', required=True, default='Hackathon Stock Core')
    description = fields.Text(string='Description')

class HackathonProduct(models.Model):
    """Product model aligned with contract_mock.json"""
    _name = 'hackathon.product'
    _description = 'Hackathon Inventory Product'
    _rec_name = 'product_name'

    product_code = fields.Char(string='Product Code / SKU', required=True, index=True)
    product_name = fields.Char(string='Product Name', required=True)
    category = fields.Char(string='Category', default='General')
    uom = fields.Char(string='Unit of Measure', default='Units')
    quantity_on_hand = fields.Integer(string='Quantity on Hand', default=0)

class HackathonStockOperation(models.Model):
    """Stock Operation model aligned with contract_mock.json"""
    _name = 'hackathon.stock.operation'
    _description = 'Hackathon Stock Operation'
    _rec_name = 'reference_no'

    reference_no = fields.Char(string='Reference No', required=True, index=True)
    operation_type = fields.Selection([
        ('receipt', 'Receipt'),
        ('delivery', 'Delivery'),
        ('internal', 'Internal Transfer'),
        ('adjustment', 'Adjustment'),
    ], string='Operation Type', required=True, default='receipt')
    partner_name = fields.Char(string='Partner / Vendor / Customer')
    product_code = fields.Char(string='Product Code')
    quantity = fields.Integer(string='Quantity', default=1)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('waiting', 'Waiting'),
        ('ready', 'Ready'),
        ('done', 'Done'),
        ('canceled', 'Canceled'),
    ], string='Status', default='draft')
