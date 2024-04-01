"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    nameProduct: { type: String },
    descriptionProduct: { type: String },
    instruction: { type: String },
    detailInterface: {
        type: Object,
        require: true,
    },
    makerInterface: {
        type: Object,
        require: true,
    },
    reviewsInterface: {
        type: Object,
    },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: "usuario" },
});
const StoreModel = (0, mongoose_1.model)("products", ProductSchema);
exports.default = StoreModel;
//# sourceMappingURL=product.model.js.map