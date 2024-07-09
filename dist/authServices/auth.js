"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.asignToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config('../../.env');
const secret = process.env.JWT_SECRET;
const asignToken = (user_id) => {
    const payload = { userId: user_id };
    if (!secret)
        return false;
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '50d' });
    return token;
};
exports.asignToken = asignToken;
const authenticate = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            res.sendStatus(401);
            return;
        }
        if (secret) {
            jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.sendStatus(403);
                }
                else {
                    req.user = decoded;
                    next();
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.authenticate = authenticate;
// const hashPassword = (password: string): Promise<string> =>{
//     return new Promise( async(resolve, reject) =>{
//         try {
//             const saltRounds = 10
//             const salt = await genSalt(saltRounds)
//             hash(password, salt, (err, hash: string) =>{
//                 if(err) reject(err)
//                 resolve(hash)
//             })
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
// export const register = (username: string, age: Number, email: string, password: string): Promise<string | boolean | object> =>{
//     return new Promise( async (resolve, reject) =>{
//         try {
//             const hashedPassword = await hashPassword(password)
//             if(hashedPassword){
//                 const user_id = v4()
//                await storeUser(user_id,username, age, email, hashedPassword)
//                .then((data) =>{
//                 resolve(data)   
//                })
//                const userToken = asignToken(user_id)
//                 if(userToken){
//                     //console.log(userToken)
//                     resolve(userToken)
//                 }
//             }
//         }catch(error){
//             reject(error)
//         }
//     })
// }
// export const login = (usernameOrEmail: string, password: string): Promise<string | boolean> =>{
//     return new Promise( async (resolve, reject) =>{
//         try {
//             const user: any = await findUser(usernameOrEmail)
//             if(!user){
//                 reject('user not found')
//             }
//             const isMatch = await compare(password, user.password)
//             if(!isMatch){
//                 reject('invalid password')
//             }
//             resolve(true)
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
