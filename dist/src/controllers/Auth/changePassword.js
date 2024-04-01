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
exports.updatePassword = exports.tokenUpdatePassword = void 0;
const user_model_1 = __importDefault(require("../../models/user.model"));
const jwt_1 = __importDefault(require("../../helpers/jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenUpdatePassword = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { email, documentNumber } = body;
    const exitsEmailAndDocument = yield user_model_1.default.findOne({
        email: email,
        documentNumber: documentNumber,
    });
    if (!exitsEmailAndDocument) {
        resp.json({
            ok: false,
            msg: "Informacion suministrada, no concuerda con los datos almacenados",
        });
    }
    // Generate token
    const token = yield (0, jwt_1.default)(exitsEmailAndDocument._id, email);
    try {
        resp.json({
            ok: true,
            token,
            msg: "Token generado",
        });
    }
    catch (error) {
        resp.status(401).json({
            ok: false,
            error,
            msg: "Comuniquese con el administrador",
        });
    }
});
exports.tokenUpdatePassword = tokenUpdatePassword;
const updatePassword = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { body } = req;
        const { password } = body;
        let passwordEncrypter = bcryptjs_1.default.hashSync(password, 10);
        const updatePassword = yield user_model_1.default.findByIdAndUpdate(id, password, {
            new: true,
        });
        resp.json({
            ok: true,
            password: passwordEncrypter,
        });
    }
    catch (error) {
        resp.status(400).json({
            ok: false,
            msg: "Error al actualizar el usuarios",
        });
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=changePassword.js.map