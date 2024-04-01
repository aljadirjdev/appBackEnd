"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    serialNumber: {
        type: Number,
        $inc: { serialNumber: 1 },
        orderStatus: { type: String, required: true },
        orderSubTotal: { type: Number, required: true },
        orderTotal: { type: Number, required: true },
        orderItems: { type: mongoose_1.Schema.Types.ObjectId, ref: "orderItems" },
        employee: { type: mongoose_1.Schema.Types.ObjectId, ref: "employees" },
        customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "customers" },
        orderCreationDate: { type: Date },
    },
}, // Move the opening curly brace to a new line
{
    timestamps: true,
});
const OrderModel = (0, mongoose_1.model)("orders", OrderSchema);
exports.default = OrderModel;
//# sourceMappingURL=order.model.js.map