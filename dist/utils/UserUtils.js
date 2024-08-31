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
exports.checkUser = exports.createUser = void 0;
const zod_1 = require("zod");
const UserSchema_1 = require("../db/schemas/UserSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
// Zod Schema to validate user data
const userZod = zod_1.z.object({
    name: zod_1.z.string({ message: 'Name is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedUser = userZod.parse(user);
    validatedUser.password = yield bcrypt_1.default.hash(validatedUser.password, SALT_ROUNDS);
    try {
        const exists = yield UserSchema_1.userModel.exists({ email: validatedUser.email });
        if (exists) {
            return { error: 'User already exists' };
        }
        const newUser = yield UserSchema_1.userModel.create(validatedUser);
        return { succes: true };
    }
    catch (error) {
        return { error: error };
    }
});
exports.createUser = createUser;
const checkUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserSchema_1.userModel.find({ email });
        if (!user) {
            return false;
        }
        const match = yield bcrypt_1.default.compare(password, user[0].password);
        return match;
    }
    catch (error) {
        return false;
    }
});
exports.checkUser = checkUser;
