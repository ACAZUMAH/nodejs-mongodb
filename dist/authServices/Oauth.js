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
