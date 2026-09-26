from odoo import models, fields


class StockSenseLocation(models.Model):
    _name = "stocksense.location"
    _description = "StockSense Inventory Location"
    _order = "name"

    name = fields.Char(
        string="Location Name",
        required=True,
    )

    code = fields.Char(
        string="Location Code",
        required=True,
    )

    active = fields.Boolean(
        string="Active",
        default=True,
    )