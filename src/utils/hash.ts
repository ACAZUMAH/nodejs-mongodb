import { genSalt, hash, compare } from 'bcrypt'


export const hashPassword =  async (password: string) =>{
    try {
        const saltRounds = 10
        const salt = await genSalt(saltRounds)
        const hashedPassword = await hash(password, salt)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async  (password: string, hash: string) =>{
    try {
        const match = await compare(password, hash)
        return match
    } catch (error) {
        console.log(error)
    }
}