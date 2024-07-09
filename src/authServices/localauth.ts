import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config('../../.env')

const secret: string | undefined = process.env.JWT_SECRET

export const asignToken = (user_id: string): string | boolean =>{
    const payload = { userId: user_id }
    if(!secret) return false
    const token = jwt.sign(payload, secret, { expiresIn: '50d'})
    return token 
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization']
        if (!authHeader ){
            res.sendStatus(401)
            return
        }
        const token = authHeader.split(' ')[1]
        if(!token){
            res.sendStatus(401)
            return
        }
        if (secret) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    //console.log(err)
                    res.sendStatus(403)
                } else {
                    req.user = decoded 
                    next()
                }
            })
        }else{
            res.sendStatus(401)
        }
    } catch (error) {
        console.log(error)
    }
}