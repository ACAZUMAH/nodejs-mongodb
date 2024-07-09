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
exports.storePayment = void 0;
const mongoconfig_1 = require("./mongoconfig");
const vendorsPayment_1 = require("./mongooseModels/vendorsPayment");
const storePayment = (transaction_id, vendor_id, invoice_no, amount, balance_amount, payment_status) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, mongoconfig_1.connectToDB)();
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
                console.log(error);
            }).finally(() => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, mongoconfig_1.close)();
            }));
        }
        catch (error) {
            console.log(error);
        }
    }));
});
exports.storePayment = storePayment;
