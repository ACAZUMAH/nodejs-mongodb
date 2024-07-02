"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employeeModel_1 = require("./mongooseModels/employeeModel");
const mongoconfig_1 = require("./mongoconfig");
(0, mongoconfig_1.connectToDB)().then(() => {
    return employeeModel_1.employeeModel.insertMany([
        { "emp_name": "Ray Renolds", "Department": 'DevOps', "salary": 55000, "onsite": false },
        { "emp_name": "Matt Aniston", "Department": "ui/ux designer", "salary": 40000, "onsite": true },
        { "emp_name": "Monica Perry", "Department": "system designer", "salary": 70000, "onsite": false },
        { "emp_name": "Rachel Tribbiani", "Department": "quality assurance", "salary": 50000, "onsite": true }
    ]);
}).then(() => {
    return employeeModel_1.employeeModel.find();
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    (0, mongoconfig_1.close)();
});
