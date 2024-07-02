"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const employeeModel_1 = require("./mongooseModels/employeeModel");
const mongoconfig_1 = require("./mongoconfig");
(0, mongoconfig_1.connectToDB)().then(() => {
    return employeeModel_1.employeeModel.updateOne({ emp_name: 'Caleb azumah' }, { onsite: true });
}).then((updateOneresult) => {
    console.log('docs for one updates: ', updateOneresult);
    return employeeModel_1.employeeModel.updateMany({ salary: { $gt: 4000 } }, { onsite: true });
}).then((updateManyResults) => {
    console.log('docs for many updates: ', updateManyResults);
}).catch((error) => {
    console.log(error);
}).finally(() => {
    (0, mongoconfig_1.close)();
});
