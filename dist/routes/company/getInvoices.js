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
exports.getInvoicesRouter = void 0;
const express_1 = __importDefault(require("express"));
const InvoiceUtils_1 = require("../../utils/InvoiceUtils");
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
const CompanyUtils_1 = require("../../utils/CompanyUtils");
const CompanyUtils_2 = require("../../utils/CompanyUtils");
exports.getInvoicesRouter = express_1.default.Router();
exports.getInvoicesRouter.post('/', AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const companyEmail = req.body.companyEmail;
    const memberEmail = req.body.user.email;
    const result = yield (0, CompanyUtils_1.getMembers)(memberEmail, companyEmail);
    const company = yield (0, CompanyUtils_2.getCompanyDetails)(companyEmail);
    if (!company.error) {
        if (((_a = company.company) === null || _a === void 0 ? void 0 : _a.owner) === memberEmail) {
            return res.status(200).json({ success: true, invoices: (yield (0, InvoiceUtils_1.getInvoices)(companyEmail)).invoices, admin: true });
        }
    }
    if (result.success) {
        if (result.members.includes(memberEmail)) {
            const response = yield (0, InvoiceUtils_1.getInvoices)(companyEmail);
            if (response.success) {
                return res.status(200).json({ success: true, invoices: response.invoices, admin: false });
            }
            else {
                return res.status(400).json({ error: response.error });
            }
        }
        else {
            return res.status(400).json({ error: 'Unauthorized' });
        }
    }
    return res.status(400).json({ error: result.error });
}));
