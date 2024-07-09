import { employeeModel } from "../mongooseModels/employeeModel";
import { connectToDB, close } from "../mongoconfig";

connectToDB().then(() =>{
    return employeeModel.deleteOne({ salary: { $lt: 4500 }, Department: 'project manager' })
}).then((updateData) =>{
    console.log(updateData)
    return employeeModel.deleteMany({ emp_name: { $regex: 'R'}})
}).then((deleteupdate) =>{
    console.log(deleteupdate)
}).catch((error) =>{
    console.log(error)
}).finally(()=>{
    close()
})