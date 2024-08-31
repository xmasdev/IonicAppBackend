"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const join_1 = require("./auth-company/join");
const register_1 = require("./auth-company/register");
exports.CompanyAuthRouter = express_1.default.Router();
exports.CompanyAuthRouter.use(join_1.companyLoginRouter);
exports.CompanyAuthRouter.use(register_1.companySignupRouter);
exports.CompanyAuthRouter.get('/', (req, res) => {
    res.send("Auth Router Working Correctly");
});
