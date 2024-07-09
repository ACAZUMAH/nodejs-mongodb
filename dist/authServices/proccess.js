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
exports.signUp = void 0;
const auth_1 = require("./auth");
const userquerys_1 = require("../Models/userquerys");
const uuid_1 = require("uuid");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        let username = data.username;
        let age = data.age;
        let email = data.email;
        let password = data.password;
        const exist_usernamme = yield (0, userquerys_1.findUser)(username);
        const exist_email = yield (0, userquerys_1.findUser)(email);
        if (!exist_usernamme && !exist_email) {
            const user_id = (0, uuid_1.v4)();
            yield (0, userquerys_1.storeUser)(user_id, username, age, email, password)
                .then((data) => {
                const token = (0, auth_1.asignToken)(user_id);
                if (token)
                    return token;
            });
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.signUp = signUp;
