"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidator = void 0;
const express_validator_1 = require("express-validator");
const checkValidator = (req, res, next) => {
    const errorsvalidator = (0, express_validator_1.validationResult)(req);
    if (!errorsvalidator.isEmpty()) {
        return res
            .status(400)
            .json({ ok: false, errorsvalidator: errorsvalidator.mapped() });
    }
    next();
};
exports.checkValidator = checkValidator;
//# sourceMappingURL=checkValidator.js.map