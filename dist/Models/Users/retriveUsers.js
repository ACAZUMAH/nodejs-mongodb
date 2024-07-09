"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.byUsernameAndEmail = exports.byUserNameOrEmail = void 0;
const userSchema_1 = require("../mongooseModels/userSchema");
//connectToDB()
const byUserNameOrEmail = (usernameOrEmail) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //await connectToDB()
            userSchema_1.userModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
                .then(data => {
                resolve(data);
            })
                .catch(error => {
                reject(error);
            });
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.byUserNameOrEmail = byUserNameOrEmail;
const byUsernameAndEmail = (username, email) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //await connectToDB()
            userSchema_1.userModel.findOne({ username: username }, { email: email })
                .then((data) => {
                resolve(data);
            });
        }
        catch (error) {
            console.log(error);
        }
    }));
};
exports.byUsernameAndEmail = byUsernameAndEmail;
