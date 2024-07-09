import { connectToDB, close } from "../mongoconfig";
import { userModel } from "../mongooseModels/userSchema";

//connectToDB()

export const byUserNameOrEmail = (usernameOrEmail: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            //await connectToDB()
            userModel.findOne({ $or: [{username: usernameOrEmail},{email: usernameOrEmail}] })
              .then(data => {
                resolve(data)
              })
              .catch(error => {
                reject(error)
              })
        } catch (error) {
            reject(error)
        }
    })

}

export const byUsernameAndEmail = (username: string, email: string) =>{
    return new Promise(async (resolve, reject) =>{
        try {
            //await connectToDB()
            userModel.findOne({ username: username },{ email: email })
                .then((data) =>{
                    resolve(data)
                })
        } catch (error) {
            console.log(error)
        }
    })
}