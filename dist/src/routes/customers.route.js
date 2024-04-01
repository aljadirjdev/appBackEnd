"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// User
const express_1 = require("express");
const customers_controller_1 = require("../controllers/customers.controller");
const express_validator_1 = require("express-validator");
const checkValidator_1 = require("../middleware/checkValidator");
const route = (0, express_1.Router)();
route.get("/", customers_controller_1.getAllCustomers);
route.get("/:id", customers_controller_1.getOneCustomer);
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
    (0, express_validator_1.check)("typeOfCompany", "El tipo de cliente es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("nameCompany", "El nombre de la empresa es obligatorio")
        .not()
        .isEmpty(),
    checkValidator_1.checkValidator,
], customers_controller_1.createCustomer);
route.put("/", customers_controller_1.updateCustomer);
route.put("/:id", customers_controller_1.changeStatusCustomer);
route.delete("/:id", customers_controller_1.deleteCustomer);
exports.default = route;
//# sourceMappingURL=customers.route.js.map