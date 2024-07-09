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
exports.login = exports.register = void 0;
const uuid_1 = require("uuid");
const userquerys_1 = require("../Models/Users/userquerys");
const retriveUsers_1 = require("../Models/Users/retriveUsers");
const hash_1 = require("../utils/hash");
const localauth_1 = require("../authServices/localauth");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const req_body = req.body;
        let username = req_body.username;
        let age = req_body.age;
        let email = req_body.email;
        let password = req_body.password;
        const exist_user = yield (0, retriveUsers_1.byUsernameAndEmail)(username, email);
        if (!exist_user) {
            const hashedPassword = yield (0, hash_1.hashPassword)(password);
            if (hashedPassword) {
                const user_id = (0, uuid_1.v4)();
                return (yield (0, userquerys_1.storeUser)(user_id, username, age, email, hashedPassword)
                    .then((data) => {
                    if (data) {
                        const userToken = (0, localauth_1.asignToken)(user_id);
                        if (userToken)
                            return userToken;
                    }
                }));
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        let usernameOrEmail = data.username;
        let password = data.password;
        const existUser = yield (0, retriveUsers_1.byUserNameOrEmail)(usernameOrEmail);
        if (existUser) {
            const savedHash = existUser.password;
            const match = yield (0, hash_1.comparePassword)(password, savedHash);
            if (match) {
                const token = (0, localauth_1.asignToken)(existUser.id);
                return token;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
