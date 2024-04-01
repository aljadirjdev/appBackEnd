"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../../controllers/Auth/auth.controller");
const checkValidator_1 = require("../../middleware/checkValidator");
const validateJWT_1 = __importDefault(require("../../middleware/validateJWT"));
const changePassword_1 = require("../../controllers/Auth/changePassword");
const route = (0, express_1.Router)();
route.post("/", [
    (0, express_validator_1.check)("password", "El campo  es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El campo Email es obligatorio").not().isEmpty().isEmail(),
    checkValidator_1.checkValidator,
], auth_controller_1.login);
route.get("/", validateJWT_1.default, auth_controller_1.newToken);
route.post("/changePassword", changePassword_1.tokenUpdatePassword);
route.put("/:id", validateJWT_1.default, changePassword_1.updatePassword);
exports.default = route;
//# sourceMappingURL=auth.route.js.map