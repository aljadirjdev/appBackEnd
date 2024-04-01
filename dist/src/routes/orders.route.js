"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("../controllers/orders.controller");
const validateJWT_1 = __importDefault(require("../middleware/validateJWT"));
const route = (0, express_1.Router)();
route.get("/getAllOrders", orders_controller_1.getAllOrders);
route.get("/getOneOrder/:id", orders_controller_1.getOneOrder);
route.post("/createOrder", validateJWT_1.default, orders_controller_1.createOrder);
route.put("/updateOrder/:id", orders_controller_1.updateOrder);
route.put("/addProduct/:id", orders_controller_1.addProductToOrder);
route.get("/timeCounter", orders_controller_1.timeCounter);
route.put("/addCustomerToOrder/:id", orders_controller_1.addCustomerToOrder);
exports.default = route;
//# sourceMappingURL=orders.route.js.map