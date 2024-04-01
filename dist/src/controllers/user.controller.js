"use strict";
// Create a new user
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
exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
// This function receives the request and response objects from Express
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const { body } = req;
    console.log(body);
    try {
        const newUser = new user_model_1.default(body);
        const createdUser = yield newUser.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado",
            user: createdUser,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el usuario",
        });
    }
});
exports.createUser = createUser;
exports.default = exports.createUser;
//# sourceMappingURL=user.controller.js.map