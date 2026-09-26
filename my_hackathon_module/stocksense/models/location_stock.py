from odoo import models, fields, api
from odoo.exceptions import ValidationError


class StockSenseLocationStock(models.Model):
    _name = "stocksense.location.stock"
    _description = "StockSense Location Stock"
    _rec_name = "product_id"

    location_id = fields.Many2one(
        "stocksense.location",
        string="Location",
        required=True,
        ondelete="cascade",
    )

    product_id = fields.Many2one(
        "stocksense.product",
        string="Product",
        required=True,
        ondelete="cascade",
    )

    quantity = fields.Float(
        string="Quantity",
        default=0.0,
    )

    @api.constrains("quantity")
    def _check_quantity(self):
        for record in self:
            if record.quantity < 0:
                raise ValidationError(
                    "Location stock quantity cannot be negative."
                )

    _sql_constraints = [
        (
            "location_product_unique",
            "unique(location_id, product_id)",
            "A product can have only one stock record per location.",
        )
    ]