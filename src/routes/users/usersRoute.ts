import { Router, Request, Response } from 'express'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import { RegisterValidation, loginValidation } from '../../utils/validatiionSchema'
import { register,login } from '../../controllers/dataflow'
//import {  authenticate }from 'authServices/Oauth'
import path from 'path'

const router = Router()

router.post('/register',checkSchema(RegisterValidation),async (req:Request,res: Response) =>{
    //console.log(username, age, email, password)
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send(errors.array())
        }else{
            const new_token = await register(req, res)
            if(new_token){
                res.status(201).json({ token: new_token })
            }else{
               res.status(400).json({ message: 'username or email already exist' })
            }
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/login', checkSchema(loginValidation), async (req: Request, res: Response) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send(errors.array())
        }else{
            const user_token = await login(req, res)
            if(user_token){
                res.status(200).json({ token: user_token })
            }else{
                res.status(401).json({ message: 'invalid user or password' })
            }
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/logout', (req: Request, res: Response) =>{
    req.session.destroy((error) =>{
        if(error){
            console.log(error)
        }else{
            res.cookie('username', '', { expires: new Date(0) });
            res.redirect('/');
        }
    })
})

export default router