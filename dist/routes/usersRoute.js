"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validatiionSchema_1 = require("../utils/validatiionSchema");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.checkSchema)(validatiionSchema_1.RegisterValidation), (req, res) => {
    const { body: { username, email, password } } = req;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array());
    }
});
exports.default = router;
