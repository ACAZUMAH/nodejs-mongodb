"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const vendorPaymentSchema = new mongoose_1.Schema({
    transaction_id: {
        type: String,
        required: true,
        unique: true
    },
    vendor_id: {
        type: String,
        required: true
    },
    invoice_no: {
        type: Number,
        required: true
    },
    payment_duedate: {
        type: Date,
        default: new Date(),
        required: true
    },
    payment_date: {
        type: Date
    },
    amount: {
        type: Number,
        required: true
    },
    balance_amount: {
        type: Number,
        required: true
    },
    payment_status: {
        type: String,
        enum: ['Unpaid', 'Partially Paid', 'Fully Paid'],
        required: true
    }
}, {
    timestamps: true
});
exports.paymentModel = (0, mongoose_1.model)('vendorPayments', vendorPaymentSchema);
