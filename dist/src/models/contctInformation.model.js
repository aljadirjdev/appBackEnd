"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactInformationSchema = new mongoose_1.Schema({
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true,
});
exports.default = ContactInformationSchema;
//# sourceMappingURL=contctInformation.model.js.map