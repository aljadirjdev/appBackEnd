// employees.route.ts
// import { Router } from "express";
import { Router } from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getOneEmployee,
  updateEmployee,
  changeStatus,
} from "../controllers/employees.controller";
import { check } from "express-validator";
import { checkValidator } from "../middleware/checkValidator";
import validateJWT from "../middleware/validateJWT";

const route = Router();

route.get("/", getAllEmployees);

route.get("/:id", getOneEmployee);

route.put("/:id", changeStatus);

route.put("/:id", updateEmployee);

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
    check("login", "El login es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    checkValidator,
  ],
  createEmployee
);
route.delete("/:id", deleteEmployee);
export default route;
