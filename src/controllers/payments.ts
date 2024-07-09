import { Request, Response } from "express";
import { storePayment, getAllInvoices,update } from "../Models/Invoices/invoices";
import { v4 } from 'uuid'

export const savePayment = (req: Request, res: Response) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            const data = req.body
            let transaction_id = data.transaction_id
            let vendor_id = data.vendor_id
            let invoice_no = data.invoice_no
            let amount = data.amount
            let balance_amount = data.balance_amount
            let payment_status = data.payment_status
            const payment = await storePayment(transaction_id,vendor_id,invoice_no,amount,balance_amount,payment_status)
            resolve(payment)
        } catch (error) {
            reject(error)
        }
    })
}

export const updatePayment = async (req: Request, res: Response) =>{
    try {
        const transaction_id = req.params.transaction_id
        //console.log(transaction_id)
        const updated = await update(transaction_id,req.body)
        if(updated){
            return getAllInvoices() 
        }
    } catch (error) {
        console.log(error)
    }
}

export const getInvoices = async(req:Request, res: Response) =>{
    try {
        const data = await getAllInvoices()
        return data
    } catch (error) {
        console.log(error)
    }
}