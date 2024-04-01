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
exports.addReview = exports.changeStatusProduct = exports.deleteProduct = exports.updateProduct = exports.getOneProduct = exports.createProduct = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
// Obtiene todos los productos
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // mostrar la ip de la persona que se conecta
    console.log(req.ip);
    try {
        const products = yield product_model_1.default.find().populate({
            path: "employee",
            select: "user.name user.email role",
        });
        res.status(200).json({
            ok: true,
            products,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al obtener los productos",
        });
    }
});
exports.getAllProducts = getAllProducts;
// Crea un nuevo producto
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    try {
        const newProduct = new product_model_1.default(Object.assign({ employee: id }, body));
        const createdProduct = yield newProduct.save();
        res.status(200).json({
            ok: true,
            msg: "Producto creado",
            product: createdProduct,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el producto",
        });
    }
});
exports.createProduct = createProduct;
// Obtiene un producto
const getOneProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_model_1.default.findById(id);
        resp.status(200).json({
            ok: true,
            product,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al obtener el producto",
        });
    }
});
exports.getOneProduct = getOneProduct;
// Actualiza un producto
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            ok: true,
            product: updatedProduct,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el producto",
        });
    }
});
exports.updateProduct = updateProduct;
// Elimina un producto
const deleteProduct = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield product_model_1.default.findByIdAndDelete(id);
        resp.json({
            ok: true,
            product,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al eliminar el producto",
        });
    }
});
exports.deleteProduct = deleteProduct;
// Cambia de estado el producto True/False
const changeStatusProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({
            ok: true,
            product: updatedProduct,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al cambiar el estado del producto",
        });
    }
});
exports.changeStatusProduct = changeStatusProduct;
// Add review to product
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { review } = req.body;
    try {
        const { msg, punctuation } = review;
        if (!msg || !punctuation || punctuation < 1 || punctuation > 5) {
            return res.status(400).json({
                ok: false,
                msg: "La reseña debe tener un mensaje y una puntuación",
            });
        }
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, { $push: { reviews: review } }, { new: true });
        res.status(200).json({
            ok: true,
            product: updatedProduct,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al agregar la reseña",
        });
    }
});
exports.addReview = addReview;
//# sourceMappingURL=products.controller.js.map