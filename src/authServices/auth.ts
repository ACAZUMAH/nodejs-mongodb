import { genSalt, hash, compare } from 'bcrypt'
import { storeUser } from '../Models/storeUser'
import { findUser } from '../Models/retriveUsers'
import { error } from 'console'

const hashPassword = (password: string): Promise<string> =>{
    return new Promise( async(resolve, reject) =>{
        try {
            const saltRounds = 10
            const salt = await genSalt(saltRounds)
            hash(password, salt, (err, hash: string) =>{
                if(err) reject(err)
                resolve(hash)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const register = (username: string, email: string, password: string) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            const hashedPassword = await hashPassword(password)
            if(!hashedPassword) reject('password hashing failed')
            await storeUser(username, email, hashedPassword)
              .then((data) =>{
                resolve(data)
              })
        }catch(error){
            reject(error)
        }
    })
}
export const login = (usernameOrEmail: string, password: string) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            const user: any = await findUser(usernameOrEmail)
            if(!user){
                reject('user not found')
            }
            const isMatch = await compare(password, user.password)
            if(!isMatch){
                reject('invalid password')
            }
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}