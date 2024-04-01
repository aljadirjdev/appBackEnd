"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const RoleSchema = new mongoose_2.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [Object], required: true },
}, {
    timestamps: true,
});
const RoleModel = (0, mongoose_1.model)("roles", RoleSchema);
exports.default = RoleModel;
//# sourceMappingURL=Roles.model.js.map