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
exports.changeStatus = exports.deleteEmployee = exports.updateEmployee = exports.getOneEmployee = exports.createEmployee = exports.getAllEmployees = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
    const { login, password } = body;
    const { documentNumber } = body.user;
    // Validar si el login ya existe
    try {
        const employeeLoging = yield employee_model_1.default.findOne({
            login: login,
        });
        const employeeDocumentNumber = yield employee_model_1.default.findOne({
            "user.documentNumber": documentNumber,
        });
        if (employeeLoging) {
            return res.status(400).json({
                ok: false,
                msg: `El empleado con login ${login} ya existe`,
            });
        }
        else if (employeeDocumentNumber) {
            // Si el email ya existe
            return res.status(400).json({
                ok: false,
                msg: `El empleado con documento: ${documentNumber}, ya existe`,
            });
        }
        const newEmployee = new employee_model_1.default(body);
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync(10);
        newEmployee.password = bcryptjs_1.default.hashSync(password, salt);
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
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.changeStatus = changeStatus;
//# sourceMappingURL=employees.controller.js.map