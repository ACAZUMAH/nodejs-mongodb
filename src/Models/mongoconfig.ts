import mongoose, { mongo } from 'mongoose'
const options = {
    useUnifiedTopology: true
}

const url: string = 'mongodb://localhost:27017/employeeDB'

export const connectToDB = async () =>{
    mongoose.connect(url).then(() =>{
        return 'connected'
    }).catch((error: object) =>{
        console.log(error)
    })
}

export const close = () =>{
    mongoose.connection.close()
}