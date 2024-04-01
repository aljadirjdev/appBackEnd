"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({});
const StoreModel = (0, mongoose_1.model)("products", ProductSchema);
exports.default = StoreModel;
//# sourceMappingURL=store.model.js.map