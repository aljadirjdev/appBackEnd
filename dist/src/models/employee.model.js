"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    user: { type: Object },
    login: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    // administrator profile, commercial profile, auditor profile
    profile: { type: [Object], required: true }, // Fix: Changed type to SchemaTypeOptions<Object, EmployeeInterface>[]
}, {
    timestamps: true,
});
const EmployeeModel = (0, mongoose_1.model)("employees", EmployeeSchema);
exports.default = EmployeeModel;
//# sourceMappingURL=employee.model.js.map