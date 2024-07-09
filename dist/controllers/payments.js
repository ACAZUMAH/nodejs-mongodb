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
exports.getInvoices = exports.updatePayment = exports.savePayment = void 0;
const invoices_1 = require("../Models/Invoices/invoices");
const savePayment = (req, res) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = req.body;
            let transaction_id = data.transaction_id;
            let vendor_id = data.vendor_id;
            let invoice_no = data.invoice_no;
            let amount = data.amount;
            let balance_amount = data.balance_amount;
            let payment_status = data.payment_status;
            const payment = yield (0, invoices_1.storePayment)(transaction_id, vendor_id, invoice_no, amount, balance_amount, payment_status);
            resolve(payment);
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.savePayment = savePayment;
const updatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction_id = req.params.transaction_id;
        //console.log(transaction_id)
        const updated = yield (0, invoices_1.update)(transaction_id, req.body);
        if (updated) {
            return (0, invoices_1.getAllInvoices)();
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updatePayment = updatePayment;
const getInvoices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, invoices_1.getAllInvoices)();
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getInvoices = getInvoices;
