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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validatiionSchema_1 = require("../../utils/validatiionSchema");
const dataflow_1 = require("../../controllers/dataflow");
const router = (0, express_1.Router)();
router.post('/register', (0, express_validator_1.checkSchema)(validatiionSchema_1.RegisterValidation), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(username, age, email, password)
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
        }
        else {
            const new_token = yield (0, dataflow_1.register)(req, res);
            if (new_token) {
                res.status(201).json({ token: new_token });
            }
            else {
                res.status(400).json({ message: 'username or email already exist' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.post('/login', (0, express_validator_1.checkSchema)(validatiionSchema_1.loginValidation), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
        }
        else {
            const user_token = yield (0, dataflow_1.login)(req, res);
            if (user_token) {
                res.status(200).json({ token: user_token });
            }
            else {
                res.status(401).json({ message: 'invalid user or password' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
        }
        else {
            res.cookie('username', '', { expires: new Date(0) });
            res.redirect('/');
        }
    });
});
exports.default = router;
