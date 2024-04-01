"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// employees.route.ts
// import { Router } from "express";
const express_1 = require("express");
const employees_controller_1 = require("../controllers/employees.controller");
const express_validator_1 = require("express-validator");
const checkValidator_1 = require("../middleware/checkValidator");
const route = (0, express_1.Router)();
route.get("/", employees_controller_1.getAllEmployees);
route.get("/:id", employees_controller_1.getOneEmployee);
route.put("/:id", employees_controller_1.changeStatus);
route.put("/:id", employees_controller_1.updateEmployee);
route.post("/", [
    (0, express_validator_1.check)("user.name", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("user.email", "El email es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("user.typeOfDocument", "El tipo de documento es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("user.documentNumber", "El numero de documento es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("user.contactInformation.phone", "La informacion telefono es obligatoria")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("user.contactInformation.country", "La informacion de pais es obligatoria")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("user.contactInformation.state", "La informacion de estado es obligatoria")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("user.contactInformation.city", "La informacion de ciudad es obligatoria")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("user.contactInformation.address", "La informacion de direccion es obligatoria")
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("login", "El login es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty(),
    checkValidator_1.checkValidator,
], employees_controller_1.createEmployee);
route.delete("/:id", employees_controller_1.deleteEmployee);
exports.default = route;
//# sourceMappingURL=employees.route.js.map