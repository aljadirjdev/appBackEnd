"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const route = (0, express_1.Router)();
route.post("/", 
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
products_controller_1.createProduct);
route.get("/", products_controller_1.getAllProducts);
route.get("/:id", products_controller_1.getOneProduct);
route.put("/:id", products_controller_1.updateProduct);
route.put("/:id", products_controller_1.changeStatusProduct);
route.delete("/:id", products_controller_1.deleteProduct);
route.put("/:id", products_controller_1.addReview);
exports.default = route;
//# sourceMappingURL=products.route.js.map