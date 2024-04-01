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
exports.timeCounter = exports.addCustomerToOrder = exports.addProductToOrder = exports.deleteOrder = exports.changeStatusOrder = exports.updateOrder = exports.getOneOrder = exports.createOrder = exports.getAllOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
// Obtiene todas las ordenes
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find().populate([
            {
                path: "employee",
                select: "user.name user.email role",
            },
            {
                path: "customer",
                select: "user.name user.email",
            },
        ]);
        res.status(200).json({
            ok: true,
            orders,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al obtener las ordenes",
        });
    }
});
exports.getAllOrders = getAllOrders;
// Crea una nueva orden
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const id = req._id;
    console.log(id);
    try {
        const order = new order_model_1.default(Object.assign({ employee: id }, body));
        yield order.save();
        res.status(201).json({
            ok: true,
            order,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear la orden",
        });
    }
});
exports.createOrder = createOrder;
// Obtiene una orden
const getOneOrder = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_model_1.default.findById(id);
        resp.status(200).json({
            ok: true,
            order,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al obtener la orden",
        });
    }
});
exports.getOneOrder = getOneOrder;
// Actualiza una orden
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(id, body);
        res.status(200).json({
            ok: true,
            order: updatedOrder,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al actualizar la orden",
        });
    }
});
exports.updateOrder = updateOrder;
// Actualiza el estado de una orden
const changeStatusOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_model_1.default.findById(id);
        if (!order) {
            return res.status(404).json({
                ok: false,
                msg: "La orden no existe",
            });
        }
        order.status = !order.status;
        yield order.save();
        res.status(200).json({
            ok: true,
            order,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al cambiar el estado de la orden",
        });
    }
});
exports.changeStatusOrder = changeStatusOrder;
// Elimina una orden
const deleteOrder = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const order = yield order_model_1.default.findByIdAndDelete(id);
        resp.json({
            ok: true,
            order,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al eliminar la orden",
        });
    }
});
exports.deleteOrder = deleteOrder;
// add product to order
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { orderItems } = body;
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(id, { $push: { orderItems: orderItems } }, { new: true });
        res.status(200).json({
            ok: true,
            order: updatedOrder,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al agregar el producto a la orden",
        });
    }
});
exports.addProductToOrder = addProductToOrder;
const addCustomerToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { customer } = body;
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(id, { customer }, { new: true });
        res.status(200).json({
            ok: true,
            order: updatedOrder,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al agregar el cliente a la orden",
        });
    }
});
exports.addCustomerToOrder = addCustomerToOrder;
// funcion contador de tiempo en minutos con el reloj del sistema
const timeCounter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let minutes = 0;
    let seconds = 0;
    let interval;
    interval = setInterval(() => {
        seconds++;
        if (seconds === 10) {
            minutes++;
            seconds = 0;
        }
        if (minutes === 1) {
            clearInterval(interval);
        }
        console.log(`${minutes}:${seconds}`);
    }, 1000);
    res.status(200).json({
        ok: true,
        msg: "Contador de tiempo",
    });
});
exports.timeCounter = timeCounter;
//# sourceMappingURL=orders.controller.js.map