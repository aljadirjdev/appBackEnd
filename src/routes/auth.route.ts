import { Router } from "express";
import { check } from "express-validator";
import { checkValidator } from "../middleware/checkValidator";
import {
  autenticateEmployee,
  forgotMyPassword,
  renewToken,
  resetPassword,
} from "../controllers/Auth/auth.controller";
import validateJWT from "../middleware/validateJWT";

const route = Router();
route.post(
  "/autenticateEmployee",
  [
    check("login", "El email es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),

    checkValidator,
  ],
  autenticateEmployee
);
route.get("/renovateToken", validateJWT, renewToken);
route.post(
  "/forgotMyPassword",
  [
    check("login", "El login es obligatorio"),
    check("documentNumber", "El cocumento no es valido"),
    checkValidator,
  ],
  forgotMyPassword
);
route.post("/resetPassword", validateJWT, renewToken, resetPassword);

export default route;
