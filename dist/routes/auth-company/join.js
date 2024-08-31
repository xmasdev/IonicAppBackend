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
exports.companyLoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const CompanyUtils_1 = require("../../utils/CompanyUtils");
const CompanyUtils_2 = require("../../utils/CompanyUtils");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
exports.companyLoginRouter = express_1.default.Router();
exports.companyLoginRouter.post('/join', AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (yield (0, CompanyUtils_1.checkCompany)(email, password)) {
        const { email: memberEmail } = req.body.user;
        const response = yield (0, CompanyUtils_2.addMember)(email, memberEmail);
        if (response.success) {
            return res.json({ success: true });
        }
        return res.status(400).json({ error: response.error });
    }
    return res.status(400).json({ error: 'Invalid credentials' });
}));
