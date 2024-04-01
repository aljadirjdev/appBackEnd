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
exports.deleteCustomer = exports.changeStatusCustomer = exports.updateCustomer = exports.getOneCustomer = exports.createCustomer = exports.getAllCustomers = void 0;
const customer_model_1 = __importDefault(require("../models/customer.model"));
// Obtiene todos los clientes
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customer_model_1.default.find();
        res.json({
            ok: true,
            customers,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al traer los usuarios",
        });
    }
});
exports.getAllCustomers = getAllCustomers;
// Crea un nuevo cliente
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener el body de la petición
        const { body } = req;
        const { email, documentNumber } = body.user;
        console.log(documentNumber);
        // Validar si el email ya existe
        const customerEmail = yield customer_model_1.default.findOne({
            "user.email": email,
        });
        //
        const customerDocumentNumber = yield customer_model_1.default.findOne({
            "user.documentNumber": documentNumber,
        });
        if (customerEmail) {
            // Si el email ya existe
            return res.status(400).json({
                ok: false,
                msg: `El cliente con email: ${email}, ya existe`,
            });
        }
        //  Si el documento ya existe
        else if (customerDocumentNumber) {
            return res.status(400).json({
                ok: false,
                msg: `El cliente con documento: ${documentNumber}, ya existe`,
            });
        }
        // Crear el nuevo cliente
        const newCustomer = new customer_model_1.default(body);
        const createdCustomer = yield newCustomer.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado",
            customer: createdCustomer,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el usuario",
        });
    }
});
exports.createCustomer = createCustomer;
// Obtiene un cliente
const getOneCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const customer = yield customer_model_1.default.findById(id);
        res.json({
            ok: true,
            customer,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al obtener el usuario",
        });
    }
});
exports.getOneCustomer = getOneCustomer;
// Actualiza un cliente
const updateCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const customerUpdate = yield customer_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            customer: customerUpdate,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuarios",
        });
    }
});
exports.updateCustomer = updateCustomer;
// Cambia de estado el usuario True/False
const changeStatusCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const userUpdateStatus = yield customer_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        res.json({
            ok: true,
            user: userUpdateStatus,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al cambiar el estado del usuarios",
        });
    }
});
exports.changeStatusCustomer = changeStatusCustomer;
// Elimina un cliente
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield customer_model_1.default.findByIdAndDelete(id);
        res.json({
            ok: true,
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario",
        });
    }
});
exports.deleteCustomer = deleteCustomer;
//# sourceMappingURL=customers.controller.js.map