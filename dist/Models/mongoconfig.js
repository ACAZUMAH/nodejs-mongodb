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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const atlas_url = process.env.DATABASE_URL;
//console.log(atlas_url)
const options = {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    autoIndex: true
};
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!atlas_url) {
            throw new Error('Database URL not found');
        }
        else {
            yield mongoose_1.default.connect(atlas_url, options);
            console.log('connected');
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.connectToDB = connectToDB;
const close = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
});
exports.close = close;
// async function connect(){
//     await connectToDB()
// }
// connect() 
