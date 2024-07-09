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
const localauth_1 = require("../../authServices/localauth");
const payments_1 = require("../../controllers/payments");
const validatiionSchema_1 = require("../../utils/validatiionSchema");
const router = (0, express_1.Router)();
router.post('/make-payment', (0, express_validator_1.checkSchema)(validatiionSchema_1.paymentValidation), localauth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).send(errors.array());
        }
        else {
            const data = yield (0, payments_1.savePayment)(req, res);
            res.json(data);
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
router.get('/get-invoices', localauth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoice = yield (0, payments_1.getInvoices)(req, res);
        res.json(invoice);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.put('/update-payment/:transaction_id', localauth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, payments_1.updatePayment)(req, res);
        if (data) {
            res.json(data);
        }
        else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
exports.default = router;
