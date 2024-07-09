import { connectToDB, close } from "../mongoconfig";
import { userModel } from "../mongooseModels/userSchema";

export const storeUser = async (user_id: string, username: string, age: Number, email: string, password: string):Promise<boolean | object> => {
    return new Promise( async (resolve, reject) =>{
        try {
            //await connectToDB()
            const user = new userModel({
                id: user_id,
                username: username,
                age: age,
                email: email,
                password: password
            })
            await user.save().then(()=>{
                resolve(true)
            }).catch((error) =>{
                reject(error)
            })
        } catch (error) {
           reject(error) 
        }
    })
}


// async function test(){
//     await storeUser('123',"caleb2020",23,"acazumah9@gmail.com","123456")
//       .then((data) => console.log(data))
//       .catch((error) => console.log(error))

// }
// test()