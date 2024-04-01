import { checkValidator } from "./../middleware/checkValidator";
import { Router } from "express";
import {
  addReview,
  changeStatusProduct,
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "../controllers/products.controller";
import { check } from "express-validator";
import validateJWT from "../middleware/validateJWT";

const route = Router();
route.post(
  "/",
  // [
  //   check("name", "El nombre es obligatorio").not().isEmpty(),
  //   check("description", "La descripcion es obligatoria").not().isEmpty(),
  //   check("category", "La categoria es obligatoria").not().isEmpty(),
  //   check("price", "El precio es obligatorio").not().isEmpty(),
  //   check("stock", "El stock es obligatorio").not().isEmpty(),
  //   check("detail.heightProduct", "La altura del producto es obligatoria")
  //     .not()
  //     .isEmpty(),
  //   check("detail.widthProduct", "El ancho del producto es obligatorio")
  //     .not()
  //     .isEmpty(),
  //   check("detail.weightProduct", "El peso del producto es obligatorio")
  //     .not()
  //     .isEmpty(),
  //   check("detail.colorProduct", "El color del producto es obligatorio")
  //     .not()
  //     .isEmpty(),
  //   check("detail.materialProduct", "El material del producto es obligatorio")
  //     .not()
  //     .isEmpty(),
  //   check(
  //     "detail.marketingBrand",
  //     "El comercializador del producto es obligatorio"
  //   )
  //     .not()
  //     .isEmpty(),
  //   check("detail.modelProduct", "El modelo del producto es obligatorio")
  //     .not()
  //     .isEmpty(),
  //   check("detail.warrantyProduct", "La garantia del producto es obligatoria")
  //     .not()
  //     .isEmpty(),
  //   checkValidator,
  // ],
  createProduct
);
route.get("/", getAllProducts);
route.get("/:id", getOneProduct);
route.put("/:id", updateProduct);
route.put("/:id", changeStatusProduct);
route.delete("/:id", deleteProduct);
route.put("/:id", addReview);

export default route;
