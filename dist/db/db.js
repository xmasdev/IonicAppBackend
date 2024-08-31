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
const mongoose_1 = __importDefault(require("mongoose"));
// get the MONGO_URI and DB_NAME from the environment variables
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ionic-backend';
const DB_NAME = process.env.DB_NAME || 'ionic-backend';
// export a function that connects to the database
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield mongoose_1.default.connect(MONGO_URI, {
            dbName: DB_NAME,
        });
        console.log('Database connected successfully', connection.connection.name);
        return connection;
    }
    catch (error) {
        console.log('Error connecting to the database', error);
    }
});
exports.default = connectDb;
