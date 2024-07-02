import { connectToDB, close } from "./mongoconfig";
import { userModel } from "./mongooseModels/userSchema";

export const storeUser = async (username: string, email: string, password: string) => {
    return new Promise( async (resolve, reject) =>{
        try {
            connectToDB()
            const user = new userModel({
                username,
                email,
                password
            })
            await user.save().then((data) =>{
                resolve(data)
            }).catch((error) =>{
                reject(error)
            }).finally(() =>{
                close()
            })
        } catch (error) {
           reject(error) 
        }
    })
}
