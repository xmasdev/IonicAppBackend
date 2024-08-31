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
exports.getMembersRouter = void 0;
const express_1 = __importDefault(require("express"));
const CompanyUtils_1 = require("../../utils/CompanyUtils");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
exports.getMembersRouter = express_1.default.Router();
exports.getMembersRouter.post('/', AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyEmail = req.body.email;
    const memberEmail = req.body.user.email;
    const result = yield (0, CompanyUtils_1.getMembers)(memberEmail, companyEmail);
    if (result.success) {
        return res.status(200).json({ members: result.members });
    }
    return res.status(400).json({ error: result.error });
}));
