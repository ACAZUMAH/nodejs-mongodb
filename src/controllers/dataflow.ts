import { v4 } from 'uuid'
import { Request,Response } from 'express'
import { storeUser } from '../Models/Users/userquerys'
import { byUsernameAndEmail, byUserNameOrEmail } from '../Models/Users/retriveUsers'
import { hashPassword, comparePassword } from '../utils/hash'
import { asignToken } from '../authServices/localauth'

export const register = async (req: Request, res:Response): Promise<string| boolean | undefined> =>{
    try{
        const req_body = req.body
        let username = req_body.username
        let age = req_body.age
        let email = req_body.email
        let password = req_body.password
        const exist_user = await byUsernameAndEmail(username, email)
        if(!exist_user){
            const hashedPassword = await hashPassword(password)
            if(hashedPassword){
                const user_id = v4()
               return ( await storeUser(user_id,username, age, email, hashedPassword)
                  .then((data) =>{
                        if(data){
                            const userToken = asignToken(user_id)
                            if(userToken)
                                return userToken
                        }
                })
                )
            } 
        }else{
            return false
        }   
    }catch(error){
        console.log(error)
    }
}

export const login = async (req: Request, res: Response) =>{
    try {
        const data = req.body
        let usernameOrEmail = data.username
        let password = data.password
        const existUser: any = await byUserNameOrEmail(usernameOrEmail)
        if(existUser){
            const savedHash = existUser.password
            const match = await comparePassword(password,savedHash)
            if(match){
                const token = asignToken(existUser.id)
                return token
            }else{
                return false
            }
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}