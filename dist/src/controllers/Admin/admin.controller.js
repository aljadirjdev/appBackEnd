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
exports.statusChangeProduct = exports.deleteProduct = exports.updateProduct = exports.getOneProduct = exports.createProduct = exports.getAllProducts = exports.deleteCustomer = exports.statusChangeCustomer = exports.updateCustomer = exports.getOneCustomer = exports.createCustomer = exports.getAllCustomers = exports.statusChangeEmployee = exports.deleteEmployee = exports.updateEmployee = exports.getOneEmployee = exports.createEmployee = exports.getAllEmployees = void 0;
const customer_model_1 = __importDefault(require("../../models/customer.model"));
const employee_model_1 = __importDefault(require("../../models/employee.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
// Obtiene todos los empleados
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(res);
    try {
        const employees = yield employee_model_1.default.find();
        res.status(200).json({
            ok: true,
            employees,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al obtener los empleados",
        });
    }
});
exports.getAllEmployees = getAllEmployees;
//  Crea un nuevo empleado
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    console.log(body);
    try {
        const newEmployee = new employee_model_1.default(body);
        const createdEmployee = yield newEmployee.save();
        res.status(200).json({
            ok: true,
            msg: "Empleado creado",
            employee: createdEmployee,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el empleado",
        });
    }
});
exports.createEmployee = createEmployee;
// Obtiene un empleado
const getOneEmployee = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const employee = yield employee_model_1.default.findById(id);
        resp.status(200).json({
            ok: true,
            employee,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al obtener el empleado",
        });
    }
});
exports.getOneEmployee = getOneEmployee;
// Actualiza un empleado
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const updatedEmployee = yield employee_model_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            ok: true,
            employee: updatedEmployee,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar el empleado",
        });
    }
});
exports.updateEmployee = updateEmployee;
// Elimina un empleado
const deleteEmployee = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const employee = yield employee_model_1.default.findByIdAndDelete(id);
        resp.json({
            ok: true,
            employee,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al eliminar el empleado",
        });
    }
});
exports.deleteEmployee = deleteEmployee;
// Cambia de estado el empleado True/False
const statusChangeEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedEmployee = yield employee_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({
            ok: true,
            employee: updatedEmployee,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al cambiar el estado del empleado",
        });
    }
});
exports.statusChangeEmployee = statusChangeEmployee;
// Obtiene todos los clientes
const getAllCustomers = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customer_model_1.default.find();
        resp.json({
            ok: true,
            customers,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al traer los usuarios",
        });
    }
});
exports.getAllCustomers = getAllCustomers;
// Crea un nuevo cliente
const createCustomer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(body);
        const newCustomer = new customer_model_1.default(body);
        const createdCustomer = yield newCustomer.save();
        resp.status(200).json({
            ok: true,
            msg: "Usuario creado",
            customer: createdCustomer,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al crear el usuario",
        });
    }
});
exports.createCustomer = createCustomer;
// Obtiene un cliente
const getOneCustomer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield customer_model_1.default.findById({ _id: id });
        resp.json({
            ok: true,
            user,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al consultar el usuarios",
        });
    }
});
exports.getOneCustomer = getOneCustomer;
// Actualiza un cliente
const updateCustomer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const customerUpdate = yield customer_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        resp.json({
            ok: true,
            customer: customerUpdate,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuarios",
        });
    }
});
exports.updateCustomer = updateCustomer;
// Cambia de estado el usuario True/False
const statusChangeCustomer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const userUpdateStatus = yield customer_model_1.default.findByIdAndUpdate(id, { status }, { new: true });
        resp.json({
            ok: true,
            user: userUpdateStatus,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al cambiar el estado del usuarios",
        });
    }
});
exports.statusChangeCustomer = statusChangeCustomer;
// Elimina un cliente
const deleteCustomer = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield customer_model_1.default.findByIdAndDelete(id);
        resp.json({
            ok: true,
            user,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al eliminar el usuario",
        });
    }
});
exports.deleteCustomer = deleteCustomer;
// Obtiene todos los productos
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.default.find();
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
    console.log(body);
    try {
        const newProduct = new product_model_1.default(body);
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
        const product = yield product_model_1.default
            .findById(id);
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
const statusChangeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.statusChangeProduct = statusChangeProduct;
//# sourceMappingURL=admin.controller.js.map