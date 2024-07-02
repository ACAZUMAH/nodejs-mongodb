import { Router, Request, Response } from 'express'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import { RegisterValidation, loginValidation } from '../utils/validatiionSchema'

const router = Router()

router.post('/register', checkSchema(RegisterValidation),(req:Request,res: Response) =>{
    const {
        body: { username, email, password }
    } = req
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send(errors.array())
    }

})
router.post('/login', checkSchema(loginValidation), (req: Request, res: Response) =>{
    const {
        body: { usernameOrEmail, password }
    } = req
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).send(errors.array())
    }else{
        
    }
})

export default router