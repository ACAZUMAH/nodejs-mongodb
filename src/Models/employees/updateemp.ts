import { employeeModel } from "../mongooseModels/employeeModel";
import { connectToDB, close } from "../mongoconfig"

connectToDB().then(() =>{
    return employeeModel.updateOne({emp_name: 'Caleb azumah'},
        { onsite: true } )
}).then((updateOneresult) =>{
    console.log('docs for one updates: ', updateOneresult)
    return employeeModel.updateMany({ salary: { $gt: 4000 }},
        { onsite: true }
    )
}).then((updateManyResults) =>{
    console.log('docs for many updates: ', updateManyResults)
}).catch((error) =>{
    console.log(error)
}).finally(() =>{
    close()
})