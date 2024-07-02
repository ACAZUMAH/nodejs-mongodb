"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employeeModel_1 = require("./mongooseModels/employeeModel");
const mongoconfig_1 = require("./mongoconfig");
(0, mongoconfig_1.connectToDB)();
let newEmployee = new employeeModel_1.employeeModel({
    emp_name: 'caleb',
    Department: 'project manager',
    salary: 4000,
    onsite: true
});
newEmployee.save().then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    (0, mongoconfig_1.close)();
});
