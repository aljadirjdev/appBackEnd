"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true },
    typeOfDocument: { type: String, required: true },
    documentNumber: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "employee", "customer"],
        default: "customer",
    },
    contactInformation: { type: Object, required: true },
});
const UserModel = (0, mongoose_1.model)("users", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map