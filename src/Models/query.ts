//require('dotenv').config('/../../.env') 
//const Schema = mongoose.Schema
import {  employeeModel } from './mongooseModels/employeeModel'
import { connectToDB,close } from './mongoconfig'

// if(!url){
//     process.exit(1)
// }
connectToDB()

employeeModel.find().then((data) =>{
    if(data.length === 0){
        console.log('No data found')
    }else{
        console.log(data)
    }
}).catch((error: object) =>{
    console.log(error)
}).finally(() =>{
    close()
})


// employeeModel.find().then((data: object) =>{
//     console.log(data)
//     mongoose.connection.close()
// })
