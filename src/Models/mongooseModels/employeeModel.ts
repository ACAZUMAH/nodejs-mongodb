import  mongoose from "mongoose";

const schema = mongoose.Schema

const employeesSchema = new schema({
    emp_name:{
        type: String,
        required: true
    },
    Department:{
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    onsite: {
        type: Boolean,
        default: false
    }
},{"collection":"employee"})

export const employeeModel = mongoose.model('employee', employeesSchema)
