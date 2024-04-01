"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    user: { type: Object },
    typeOfCompany: { type: String, required: true },
    nameCompany: { type: String, required: true },
    status: { type: Boolean, default: true },
}, {
    timestamps: true,
});
const CustomerModel = (0, mongoose_1.model)("customers", CustomerSchema);
exports.default = CustomerModel;
//# sourceMappingURL=customer.model.js.map