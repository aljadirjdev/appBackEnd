import { Router } from "express";
import {
  addCustomerToOrder,
  addProductToOrder,
  createOrder,
  getAllOrders,
  getOneOrder,
  timeCounter,
  updateOrder,
} from "../controllers/orders.controller";
import validateJWT from "../middleware/validateJWT";

const route = Router();

route.get("/", getAllOrders);
route.get("/:id", getOneOrder);
route.post("", createOrder);
route.put("/:id", updateOrder);
route.put("/:id", addProductToOrder);
route.get("/", timeCounter);
route.put("/:id", addCustomerToOrder);

export default route;
