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
exports.getAllInvoices = exports.update = exports.storePayment = void 0;
const vendorsPayment_1 = require("../mongooseModels/vendorsPayment");
const storePayment = (transaction_id, vendor_id, invoice_no, amount, balance_amount, payment_status) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //await connectToDB()
            const new_payment = new vendorsPayment_1.paymentModel({
                transaction_id: transaction_id,
                vendor_id: vendor_id,
                invoice_no: invoice_no,
                amount: amount,
                balance_amount: balance_amount,
                payment_status: payment_status
            });
            yield new_payment.save().then((data) => {
                if (data) {
                    resolve(data);
                }
            }).catch((error) => {
                throw new Error("cannot connect");
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
});
exports.storePayment = storePayment;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //await connectToDB()
        const transaction = yield vendorsPayment_1.paymentModel.find({ transaction_id: id });
        if (transaction.length > 0) {
            const updated = new vendorsPayment_1.paymentModel(data);
            transaction[0].balance_amount = transaction[0].balance_amount - data.amount;
            if (transaction[0].balance_amount <= 0) {
                transaction[0].payment_status = 'Fully Paid';
            }
            else {
                transaction[0].payment_status = 'Partially Paid';
            }
            transaction[0].payment_date = new Date();
            const result = yield updated.updateOne({ transaction_id: id }, { $set: transaction[0] });
            if (result) {
                return true;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.update = update;
const getAllInvoices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //await connectToDB()
        const invoices = yield vendorsPayment_1.paymentModel.find();
        return invoices;
        //await close()
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllInvoices = getAllInvoices;
