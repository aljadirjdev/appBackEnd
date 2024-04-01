"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactMeSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    oportunity: { type: mongoose_1.Schema.Types.ObjectId, ref: "opportunityManagements" },
}, {
    timestamps: true,
});
const ContactMeModel = (0, mongoose_1.model)("contactMe", ContactMeSchema);
exports.default = ContactMeModel;
//# sourceMappingURL=contactMe.model.js.map