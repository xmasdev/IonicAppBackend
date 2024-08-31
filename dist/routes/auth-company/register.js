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
exports.companySignupRouter = void 0;
const express_1 = __importDefault(require("express"));
const CompanyUtils_1 = require("../../utils/CompanyUtils");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
exports.companySignupRouter = express_1.default.Router();
exports.companySignupRouter.post('/register', AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const company = { name, email, password, address, owner: req.body.user.email, members: [] };
    try {
        const response = yield (0, CompanyUtils_1.createCompany)(company);
        if (response.error) {
            return res.status(400).json({ error: response.error });
        }
        return res.status(201).json({ success: true });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
