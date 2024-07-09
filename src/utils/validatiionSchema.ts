import { error } from "console"
import { isString } from "util"

export  const  RegisterValidation = {
    username: {
        notEmpty: {
            errorMessage: 'username required'
        },
        isString: {
            errorMessage: 'username must be a string'
        },
        isLength: {
            options: { min : 5, max: 20},
            errorMessage: 'username must be between 5 and 20 characters'
        }

    },
    email: {
        notEmpty: {
            errorMessage: 'email required'
        },
        isEmail: {
            errorMessage: 'invalid email'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password required'
        },
        isLength:{
            options: {
               min: 6,
               max: 16
            },
            errorMessage: 'password must be between 6 and 16 characters'
        }
    }
}

export const loginValidation = {
    username: {
        notEmpty: {
            errorMessage: 'username or email required'
        },
        isString: {
            errorMessage: 'username or email must be a string'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password required'
        },
        isLength: {
            options: {
                min: 6,
                max: 16
            },
            errorMessage: 'password must be between 6 and 16 characters'
        }
    }
}
export const paymentValidation = {
    transaction_id: {
        notEmpty:{
            errorMessage: 'transaction id required'
        },
        isString:{
            errorMessage: 'id must be a string'
        }
    },
    vendor_id: {
        notEmpty:{
            errorMessage: 'vendor id required'
        },
        isString:{
            errorMessage: 'id must be a string'
        }
    },
    invoice_no: {
        notEmpty:{
            errorMessage: 'invoice number required'
        }
    },
    amount: {
        notEmpty:{
            errorMessage: 'amount required'
        }
    },
    balance_amount: {
        notEmpty:{
            errorMessage: 'amount required'
        }
    },
    payment_status:{
        notEmpty: {
            errorMessage: 'payment status required'
        }
    }
}