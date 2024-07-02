"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const employeesSchema = new schema({
    emp_name: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    onsite: {
        type: Boolean,
        default: false
    }
}, { "collection": "employee" });
exports.employeeModel = mongoose_1.default.model('employee', employeesSchema);
