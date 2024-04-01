"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_route_1 = __importDefault(require("./customers.route"));
const customers_controller_1 = require("../controllers/customers.controller");
const express_validator_1 = require("express-validator");
const checkValidator_1 = require("../middleware/checkValidator");
const Route = (0, express_1.Router)();
customers_route_1.default.get("/", customers_controller_1.getAllCustomers);
customers_route_1.default.get("/:id", customers_controller_1.getOneCustomer);
customers_route_1.default.post("/", [
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
    (0, express_validator_1.check)("typeOfCompany", "El tipo de cliente es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("nameCompany", "El nombre de la empresa es obligatorio")
        .not()
        .isEmpty(),
    checkValidator_1.checkValidator,
], customers_controller_1.createCustomer);
customers_route_1.default.put("/:id", customers_controller_1.updateCustomer);
customers_route_1.default.delete("/:id", customers_controller_1.deleteCustomer);
exports.default = Route;
//# sourceMappingURL=admin.route.js.map