import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
     },
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
},{collection: "users"})

export const userModel = model('users', userSchema)