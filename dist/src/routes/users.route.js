"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const route = (0, express_1.Router)();
route.post("/createUser", users_controller_1.createUser);
exports.default = route;
//# sourceMappingURL=users.route.js.map