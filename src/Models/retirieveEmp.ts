import { employeeModel } from "./mongooseModels/employeeModel";
import { connectToDB,close } from './mongoconfig'

connectToDB()

employeeModel.find().then(data =>{
    console.log(data)
}).catch((error) =>{
    console.log(error)
}).finally(() =>{
    close()
})
