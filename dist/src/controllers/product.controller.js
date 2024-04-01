"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.createProduct = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/store/product.model"));
exports.ProductModel = product_model_1.default;
// Trae todos los usuarios
const getAllProducts = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busca todos los users
        const products = yield product_model_1.default.find().populate({
            path: "users",
            select: "firstName,lastName,email, documentNumber",
        });
        resp.json({
            ok: true,
            products,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al traer los productos",
        });
    }
});
exports.getAllProducts = getAllProducts;
// Crea un nuevo usuario
const createProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    try {
        const newProduct = new product_model_1.default(Object.assign({ usuario: id }, body));
        const createdProduct = yield newProduct.save();
        resp.status(200).json({
            ok: true,
            msg: "producto creado",
            user: createdProduct,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al crear el producto",
        });
    }
});
exports.createProduct = createProduct;
//# sourceMappingURL=product.controller.js.map