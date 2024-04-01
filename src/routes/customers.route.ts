// User
import { Router } from "express";
import {
  changeStatusCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getOneCustomer,
  updateCustomer,
} from "../controllers/customers.controller";
import { check } from "express-validator";
import { checkValidator } from "../middleware/checkValidator";
import validateJWT from "../middleware/validateJWT";

const route = Router();
route.get("/", getAllCustomers);
route.get("/:id", getOneCustomer);
route.post(
  "/",
  [
    check("user.name", "El nombre es obligatorio").not().isEmpty(),
    check("user.email", "El email es obligatorio").not().isEmpty(),
    check("user.typeOfDocument", "El tipo de documento es obligatorio")
      .not()
      .isEmpty(),
    check("user.documentNumber", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    check(
      "user.contactInformation.phone",
      "La informacion telefono es obligatoria"
    )
      .not()
      .isEmpty(),
    check(
      "user.contactInformation.country",
      "La informacion de pais es obligatoria"
    )
      .not()
      .isEmpty(),
    check(
      "user.contactInformation.state",
      "La informacion de estado es obligatoria"
    )
      .not()
      .isEmpty(),
    check(
      "user.contactInformation.city",
      "La informacion de ciudad es obligatoria"
    )
      .not()
      .isEmpty(),
    check(
      "user.contactInformation.address",
      "La informacion de direccion es obligatoria"
    )
      .not()
      .isEmpty(),
    check("typeOfCompany", "El tipo de cliente es obligatorio").not().isEmpty(),
    check("nameCompany", "El nombre de la empresa es obligatorio")
      .not()
      .isEmpty(),

    checkValidator,
  ],
  createCustomer
);
route.put("/", updateCustomer);
route.put("/:id", changeStatusCustomer);
route.delete("/:id", deleteCustomer);

export default route;
