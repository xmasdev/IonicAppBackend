"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./auth/login");
const signup_1 = require("./auth/signup");
exports.AuthRouter = express_1.default.Router();
exports.AuthRouter.use(login_1.loginRouter);
exports.AuthRouter.use(signup_1.signupRouter);
exports.AuthRouter.get('/', (req, res) => {
    res.send("Auth Router Working Correctly");
});
