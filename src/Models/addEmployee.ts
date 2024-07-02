import { employeeModel } from "./mongooseModels/employeeModel";
import { connectToDB,close } from "./mongoconfig";

connectToDB()

let newEmployee = new employeeModel({
    emp_name: 'caleb',
    Department: 'project manager',
    salary: 4000,
    onsite: true 
})

newEmployee.save().then((data) =>{
    console.log(data)
}).catch((error) =>{
    console.log(error)
}).finally(() =>{
    close()
})
