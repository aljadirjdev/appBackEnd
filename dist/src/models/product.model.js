"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    detail: { type: Object, required: true },
    maker: { type: Object, required: true },
    reviews: { type: Array },
    employee: { type: mongoose_1.Schema.Types.ObjectId, ref: "employees" },
}, { timestamps: true });
const ProductModel = (0, mongoose_1.model)("products", ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map