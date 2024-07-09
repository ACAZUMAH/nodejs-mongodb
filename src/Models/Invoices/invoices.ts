import { connectToDB, close } from "../mongoconfig";
import { paymentModel } from "../mongooseModels/vendorsPayment";

export const storePayment = async (transaction_id:string,vendor_id:number,invoice_no:string,amount: number,balance_amount:number,payment_status:string) =>{
    return new Promise( async (resolve, reject) =>{
        try {
            //await connectToDB()
            const new_payment = new paymentModel({
                transaction_id: transaction_id,
                vendor_id: vendor_id,
                invoice_no: invoice_no,
                amount: amount,
                balance_amount: balance_amount,
                payment_status: payment_status
            })
            await new_payment.save().then((data) =>{
                if(data){
                    resolve(data)
                }
            }).catch((error) =>{
                throw new Error("cannot connect")
            })
        } catch (error) {
            console.log(error)
        }
    })
}

export const update = async (id: string,data: any) =>{
    try {
        //await connectToDB()
        const transaction = await paymentModel.find({transaction_id: id})
        if(transaction.length > 0){
            const updated = new paymentModel(data)
            transaction[0].balance_amount = transaction[0].balance_amount - data.amount
            if(transaction[0].balance_amount <= 0){
                transaction[0].payment_status = 'Fully Paid'
            }else{
                transaction[0].payment_status = 'Partially Paid'
            }
            transaction[0].payment_date = new Date()
            const result = await updated.updateOne({transaction_id: id}, { $set: transaction[0] })
            if(result){
                return true
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const getAllInvoices = async () =>{
    try {
        //await connectToDB()
        const invoices = await paymentModel.find()
        return invoices
        //await close()
    } catch (error) {
        console.log(error)
    }
}