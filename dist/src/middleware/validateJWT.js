"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jwt = require("jsonwebtoken");
//  Validate JWT
const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    console.log(token);
    // Validate token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion",
        });
    }
    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req._id = _id;
        next();
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token",
        });
    }
};
exports.default = validateJWT;
const generateJWT = (id, login = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id, login };
        jwt.sign(payload, process.env.JWT_SECRET, process.env.JWT_EXPIRE_IN, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token");
            }
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=validateJWT.js.map