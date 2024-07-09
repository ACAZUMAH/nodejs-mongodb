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
exports.findUser = exports.storeUser = void 0;
const mongoconfig_1 = require("./mongoconfig");
const userSchema_1 = require("./mongooseModels/userSchema");
const storeUser = (user_id, username, age, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, mongoconfig_1.connectToDB)();
            const user = new userSchema_1.userModel({
                user_id: user_id,
                username: username,
                age: age,
                email: email,
                password: password
            });
            yield user.save().then(() => {
                resolve(true);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                (0, mongoconfig_1.close)();
            });
        }
        catch (error) {
            reject(error);
        }
    }));
});
exports.storeUser = storeUser;
const findUser = (usernameOrEmail) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, mongoconfig_1.connectToDB)();
            userSchema_1.userModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
                .then(data => {
                resolve(data);
            })
                .catch(error => {
                reject(error);
            })
                .finally(() => {
                (0, mongoconfig_1.close)();
            });
        }
        catch (error) {
            reject(error);
        }
    }));
};
exports.findUser = findUser;
