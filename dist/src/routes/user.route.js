"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const route = (0, express_1.Router)();
route.post("/user", user_controller_1.createUser);
exports.default = route;
//# sourceMappingURL=user.route.js.map