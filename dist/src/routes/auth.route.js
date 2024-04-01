"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const checkValidator_1 = require("../middleware/checkValidator");
const auth_controller_1 = require("../controllers/Auth/auth.controller");
const validateJWT_1 = __importDefault(require("../middleware/validateJWT"));
const route = (0, express_1.Router)();
route.post("/autenticateEmployee", [
    (0, express_validator_1.check)("login", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria").not().isEmpty(),
    checkValidator_1.checkValidator,
], auth_controller_1.autenticateEmployee);
route.get("/renovateToken", validateJWT_1.default, auth_controller_1.renewToken);
route.post("/forgotMyPassword", [
    (0, express_validator_1.check)("login", "El login es obligatorio"),
    (0, express_validator_1.check)("documentNumber", "El cocumento no es valido"),
    checkValidator_1.checkValidator,
], auth_controller_1.forgotMyPassword);
route.post("/resetPassword", validateJWT_1.default, auth_controller_1.renewToken, auth_controller_1.resetPassword);
exports.default = route;
//# sourceMappingURL=auth.route.js.map