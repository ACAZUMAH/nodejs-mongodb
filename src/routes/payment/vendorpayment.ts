import { Router, Request, Response } from 'express'
import { checkSchema, validationResult, matchedData } from 'express-validator'
import { authenticate } from '../../authServices/localauth'
import { savePayment,getInvoices,updatePayment } from '../../controllers/payments'
import { paymentValidation } from '../../utils/validatiionSchema'
const router = Router()

router.post('/make-payment', checkSchema(paymentValidation), authenticate, async (req:Request, res: Response) =>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(400).send(errors.array())
        }else{
            const data = await savePayment(req,res)
            res.json(data)
        }
    } catch (error: any) {
        res.status(400).json( { message: error.message })
    }
})

router.get('/get-invoices', authenticate, async (req: Request, res: Response)=>{
    try {
        const invoice = await getInvoices(req, res)
        res.json(invoice)
    } catch (error: any) {
      res.status(500).json({ message: error.message })  
    }
})

router.put('/update-payment/:transaction_id', authenticate, async (req: Request, res: Response) =>{
    try {
        const data = await updatePayment(req, res)
        if(data){
            res.json(data)
        }else{
            res.status(404).json({ message: 'Transaction not found'})
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
})

export default router