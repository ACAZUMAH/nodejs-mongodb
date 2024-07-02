import { connectToDB, close } from "./mongoconfig";
import { userModel } from "./mongooseModels/userSchema";

export const findUser = (usernameOrEmail: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            connectToDB()
            userModel.findOne({ $or: [{username: usernameOrEmail},{email: usernameOrEmail}] })
              .then(data => {
                resolve(data)
              })
              .catch(error => {
                reject(error)
              })
              .finally(() =>{
                close()
              })
        } catch (error) {
            reject(error)
        }
    })

}