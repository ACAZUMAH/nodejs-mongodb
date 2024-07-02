import { employeeModel } from "./mongooseModels/employeeModel";
import { connectToDB,close } from "./mongoconfig";

connectToDB().then(() =>{
    return employeeModel.insertMany([
        { "emp_name": "Ray Renolds","Department": 'DevOps', "salary": 55000, "onsite": false},
        { "emp_name": "Matt Aniston","Department": "ui/ux designer", "salary": 40000, "onsite": true },
        { "emp_name": "Monica Perry", "Department": "system designer", "salary": 70000, "onsite": false},
        { "emp_name": "Rachel Tribbiani", "Department": "quality assurance", "salary": 50000, "onsite": true }
    ])
}).then(() =>{
    return employeeModel.find()
}).then((data) =>{
    console.log(data)
}).catch((error) =>{
    console.log(error)
}).finally(() =>{
    close()
})