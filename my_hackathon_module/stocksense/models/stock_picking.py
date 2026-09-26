from odoo import models, fields, api, _
from odoo.exceptions import UserError, ValidationError


class StockPicking(models.Model):
    _name = "stocksense.stock.picking"
    _description = "StockSense Stock Operation"
    _order = "id desc"

    reference_no = fields.Char(
        string="Reference No",
        required=True,
        copy=False,
        readonly=True,
        default=lambda self: _("New"),
    )

    operation_type = fields.Selection(
        [
            ("receipt", "Receipt"),
            ("delivery", "Delivery"),
            ("internal", "Internal Transfer"),
        ],
        string="Operation Type",
        required=True,
        default="delivery",
    )

    source_location_id = fields.Many2one(
        "stocksense.location",
        string="Source Location",
    )

    destination_location_id = fields.Many2one(
        "stocksense.location",
        string="Destination Location",
    )

    partner_name = fields.Char(
        string="Partner",
        help="Supplier or customer name.",
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("confirmed", "Confirmed"),
            ("done", "Done"),
            ("cancelled", "Cancelled"),
        ],
        string="Status",
        required=True,
        default="draft",
    )

    move_line_ids = fields.One2many(
        "stocksense.stock.move.line",
        "picking_id",
        string="Stock Moves",
    )

    total_quantity = fields.Float(
        string="Total Quantity",
        compute="_compute_total_quantity",
        store=True,
    )

    @api.depends("move_line_ids.quantity")
    def _compute_total_quantity(self):
        for picking in self:
            picking.total_quantity = sum(
                picking.move_line_ids.mapped("quantity")
            )

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get("reference_no", _("New")) == _("New"):
                vals["reference_no"] = (
                    self.env["ir.sequence"].next_by_code(
                        "stocksense.stock.picking"
                    )
                    or _("New")
                )

        return super().create(vals_list)

    def action_confirm(self):
        for picking in self:
            if picking.status != "draft":
                raise UserError(
                    _("Only draft operations can be confirmed.")
                )

            if not picking.move_line_ids:
                raise UserError(
                    _("Please add at least one product before confirming.")
                )

            # DELIVERY must have a source location
            if picking.operation_type == "delivery":
                if not picking.source_location_id:
                    raise UserError(
                        _("Please select a source location for the delivery.")
                    )

            # INTERNAL TRANSFER validation
            if picking.operation_type == "internal":
                if not picking.source_location_id:
                    raise UserError(
                        _("Please select a source location.")
                    )

                if not picking.destination_location_id:
                    raise UserError(
                        _("Please select a destination location.")
                    )

                if (
                    picking.source_location_id
                    == picking.destination_location_id
                ):
                    raise UserError(
                        _("Source and destination locations must be different.")
                    )

            picking.status = "confirmed"

    def action_done(self):
        for picking in self:
            if picking.status != "confirmed":
                raise UserError(
                    _("Only confirmed operations can be completed.")
                )

            for line in picking.move_line_ids:
                if line.quantity <= 0:
                    raise ValidationError(
                        _("Quantity must be greater than 0.")
                    )

            # DELIVERY
            if picking.operation_type == "delivery":

                source = picking.source_location_id

                for line in picking.move_line_ids:
                    product = line.product_id

                    # Global stock validation
                    if line.quantity > product.quantity_on_hand:
                        raise UserError(
                            _(
                                "Insufficient stock for product '%s'. "
                                "Available: %s, Requested: %s"
                            )
                            % (
                                product.name,
                                product.quantity_on_hand,
                                line.quantity,
                            )
                        )

                    # Location stock validation
                    source_stock = self.env[
                        "stocksense.location.stock"
                    ].search(
                        [
                            ("location_id", "=", source.id),
                            ("product_id", "=", product.id),
                        ],
                        limit=1,
                    )

                    available_quantity = (
                        source_stock.quantity if source_stock else 0.0
                    )

                    if line.quantity > available_quantity:
                        raise UserError(
                            _(
                                "Insufficient stock for product '%s' "
                                "at location '%s'. "
                                "Available: %s, Requested: %s"
                            )
                            % (
                                product.name,
                                source.name,
                                available_quantity,
                                line.quantity,
                            )
                        )

                # Update global + location stock
                for line in picking.move_line_ids:
                    product = line.product_id

                    source_stock = self.env[
                        "stocksense.location.stock"
                    ].search(
                        [
                            ("location_id", "=", source.id),
                            ("product_id", "=", product.id),
                        ],
                        limit=1,
                    )

                    product.quantity_on_hand -= line.quantity
                    source_stock.quantity -= line.quantity

            # INTERNAL TRANSFER
            elif picking.operation_type == "internal":

                source = picking.source_location_id
                destination = picking.destination_location_id

                for line in picking.move_line_ids:

                    source_stock = self.env[
                        "stocksense.location.stock"
                    ].search(
                        [
                            ("location_id", "=", source.id),
                            ("product_id", "=", line.product_id.id),
                        ],
                        limit=1,
                    )

                    available_quantity = (
                        source_stock.quantity if source_stock else 0.0
                    )

                    if line.quantity > available_quantity:
                        raise UserError(
                            _(
                                "Insufficient stock for product '%s' "
                                "at location '%s'. "
                                "Available: %s, Requested: %s"
                            )
                            % (
                                line.product_id.name,
                                source.name,
                                available_quantity,
                                line.quantity,
                            )
                        )

                for line in picking.move_line_ids:

                    source_stock = self.env[
                        "stocksense.location.stock"
                    ].search(
                        [
                            ("location_id", "=", source.id),
                            ("product_id", "=", line.product_id.id),
                        ],
                        limit=1,
                    )

                    destination_stock = self.env[
                        "stocksense.location.stock"
                    ].search(
                        [
                            ("location_id", "=", destination.id),
                            ("product_id", "=", line.product_id.id),
                        ],
                        limit=1,
                    )

                    source_stock.quantity -= line.quantity

                    if destination_stock:
                        destination_stock.quantity += line.quantity
                    else:
                        self.env["stocksense.location.stock"].create(
                            {
                                "location_id": destination.id,
                                "product_id": line.product_id.id,
                                "quantity": line.quantity,
                            }
                        )

            # RECEIPT
            elif picking.operation_type == "receipt":

                for line in picking.move_line_ids:
                    line.product_id.quantity_on_hand += line.quantity

                    if picking.destination_location_id:
                        destination_stock = self.env[
                            "stocksense.location.stock"
                        ].search(
                            [
                                (
                                    "location_id",
                                    "=",
                                    picking.destination_location_id.id,
                                ),
                                (
                                    "product_id",
                                    "=",
                                    line.product_id.id,
                                ),
                            ],
                            limit=1,
                        )

                        if destination_stock:
                            destination_stock.quantity += line.quantity
                        else:
                            self.env[
                                "stocksense.location.stock"
                            ].create(
                                {
                                    "location_id": (
                                        picking.destination_location_id.id
                                    ),
                                    "product_id": line.product_id.id,
                                    "quantity": line.quantity,
                                }
                            )

            picking.status = "done"

    def action_cancel(self):
        for picking in self:
            if picking.status == "done":
                raise UserError(
                    _("Completed operations cannot be cancelled.")
                )

            picking.status = "cancelled"


class StockMoveLine(models.Model):
    _name = "stocksense.stock.move.line"
    _description = "StockSense Stock Move Line"

    picking_id = fields.Many2one(
        "stocksense.stock.picking",
        string="Stock Operation",
        required=True,
        ondelete="cascade",
    )

    product_id = fields.Many2one(
        "stocksense.product",
        string="Product",
        required=True,
    )

    product_code = fields.Char(
        string="Product Code",
        related="product_id.product_code",
        readonly=True,
    )

    product_name = fields.Char(
        string="Product Name",
        related="product_id.name",
        readonly=True,
    )

    uom = fields.Char(
        string="Unit of Measure",
        related="product_id.uom",
        readonly=True,
    )

    quantity = fields.Float(
        string="Quantity",
        required=True,
        default=1.0,
    )

    @api.constrains("quantity")
    def _check_quantity(self):
        for line in self:
            if line.quantity <= 0:
                raise ValidationError(
                    _("Quantity must be greater than 0.")
                )