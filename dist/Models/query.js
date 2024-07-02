"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//require('dotenv').config('/../../.env') 
//const Schema = mongoose.Schema
const employeeModel_1 = require("./mongooseModels/employeeModel");
const mongoconfig_1 = require("./mongoconfig");
// if(!url){
//     process.exit(1)
// }
(0, mongoconfig_1.connectToDB)();
employeeModel_1.employeeModel.find().then((data) => {
    if (data.length === 0) {
        console.log('No data found');
    }
    else {
        console.log(data);
    }
}).catch((error) => {
    console.log(error);
}).finally(() => {
    (0, mongoconfig_1.close)();
});
// employeeModel.find().then((data: object) =>{
//     console.log(data)
//     mongoose.connection.close()
// })
