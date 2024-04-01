"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({});
const ProductModel = (0, mongoose_1.model)("products", ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=store.model.js.map