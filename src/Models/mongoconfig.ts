import mongoose from 'mongoose'
require('dotenv').config()

const atlas_url: string | undefined = process.env.DATABASE_URL
//console.log(atlas_url)

const options = {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    autoIndex: true
}

export const connectToDB = async () =>{
    try {
        if(!atlas_url){
            throw new Error('Database URL not found')
        }else{
            await mongoose.connect(atlas_url,options)
            console.log('connected')
        }
    } catch (error) {
        console.log(error)
    }
}

export const close = async () =>{
    await mongoose.connection.close()
}

// async function connect(){
//     await connectToDB()
// }
// connect() 