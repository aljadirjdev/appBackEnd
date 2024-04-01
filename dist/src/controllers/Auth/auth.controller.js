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
exports.resetPassword = exports.forgotMyPassword = exports.changePassword = exports.renewToken = exports.newToken = exports.autenticateEmployee = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../../helpers/jwt"));
const employee_model_1 = __importDefault(require("../../models/employee.model"));
// Autenticate employee
const autenticateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login: email, password } = req.body;
    try {
        const employeeLogin = yield employee_model_1.default.findOne({ login: email });
        if (!employeeLogin) {
            return res.status(401).json({
                ok: false,
                msg: "Credenciales no validas",
            });
        }
        // Validar password
        const validatePassword = bcryptjs_1.default.compareSync(password, employeeLogin.password);
        if (!validatePassword) {
            return res.status(401).json({
                ok: false,
                msg: "Usuario y contraseña incorrecto",
            });
        }
        // generate token
        const token = yield (0, jwt_1.default)(employeeLogin._id, employeeLogin.email);
        res.status(200).json({ ok: true, user: employeeLogin, token });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Pongase en contacto con el admin",
        });
    }
});
exports.autenticateEmployee = autenticateEmployee;
// Generate new token
const newToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    if (typeof id === "undefined") {
        throw new Error("No existe id");
    }
    const user = yield employee_model_1.default.findById(id);
    // Generate token
    const token = yield (0, jwt_1.default)(id.toString());
    try {
        res.json({
            ok: true,
            token,
            user,
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            error,
            msg: "Comuniquese con el administrador",
        });
    }
});
exports.newToken = newToken;
// Renew token
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    if (typeof id === "undefined") {
        throw new Error("No existe id");
    }
    // Get user
    const employee = yield employee_model_1.default.findById(id);
    // Generate token
    const token = yield (0, jwt_1.default)(id.toString());
    try {
        res.json({
            ok: true,
            token,
            employee,
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            error,
            msg: "Comuniquese con el administrador",
        });
    }
});
exports.renewToken = renewToken;
//  change password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    if (typeof id === "undefined") {
        throw new Error("No existe id");
    }
    const { password, newPassword } = req.body;
    const employee = yield employee_model_1.default.findById(id);
    // Validate password
    const validatePassword = bcryptjs_1.default.compareSync(password, employee.password);
    if (!validatePassword) {
        return res.status(401).json({
            ok: false,
            msg: "Contraseña incorrecta",
        });
    }
    // Encrypt password
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passwordHash = bcryptjs_1.default.hashSync(newPassword, salt);
    try {
        yield employee_model_1.default.findByIdAndUpdate(id, { password: passwordHash });
        res.json({
            ok: true,
            msg: "Contraseña actualizada",
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            error,
            msg: "Comuniquese con el administrador",
        });
    }
});
exports.changePassword = changePassword;
// Forgot password
const forgotMyPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, documentNumber } = req.body;
    try {
        const employee = yield employee_model_1.default.findOne({
            login: login,
            "user.documentNumber": documentNumber,
        });
        if (!employee) {
            return res.status(401).json({
                ok: false,
                msg: "Usuario no encontrado",
            });
        }
        // generate token
        const token = yield (0, jwt_1.default)(employee._id, employee.documentNumber, process.env.FORGOT_PASSWORD_EXPIRE_IN, process.env.FORGOT_PASSWORD_SECRET_WORD);
        res.json({
            ok: true,
            token,
            employee,
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            error,
            msg: "Comuniquese con el administrador",
        });
    }
});
exports.forgotMyPassword = forgotMyPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = req.body;
    const id = req.params.id;
    // Encrypt password
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passwordHash = bcryptjs_1.default.hashSync(newPassword, salt);
    try {
        yield employee_model_1.default.findByIdAndUpdate(id, { password: passwordHash });
        res.json({
            ok: true,
            msg: "Contraseña actualizada",
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            error,
            msg: "Comuniquese con el administrador",
        });
    }
});
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.controller.js.map