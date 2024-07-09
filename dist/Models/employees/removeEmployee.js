"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employeeModel_1 = require("../mongooseModels/employeeModel");
const mongoconfig_1 = require("../mongoconfig");
(0, mongoconfig_1.connectToDB)().then(() => {
    return employeeModel_1.employeeModel.deleteOne({ salary: { $lt: 4500 }, Department: 'project manager' });
}).then((updateData) => {
    console.log(updateData);
    return employeeModel_1.employeeModel.deleteMany({ emp_name: { $regex: 'R' } });
}).then((deleteupdate) => {
    console.log(deleteupdate);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    (0, mongoconfig_1.close)();
});
