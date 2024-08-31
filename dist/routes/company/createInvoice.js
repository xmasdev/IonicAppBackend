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
exports.createInvoiceRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
const InvoiceUtils_1 = require("../../utils/InvoiceUtils");
const CompanyUtils_1 = require("../../utils/CompanyUtils");
exports.createInvoiceRouter = express_1.default.Router();
exports.createInvoiceRouter.post('/', AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companyEmail = req.body.companyEmail;
    const email = req.body.user.email;
    const companyResponse = yield (0, CompanyUtils_1.getCompanyDetails)(companyEmail);
    if (companyResponse.success) {
        let company = companyResponse.company;
        if (company.owner != email) {
            return res.status(400).json({ error: 'You are not authorized to create invoice for this company' });
        }
        const invoice = {
            companyDetails: {
                email: companyEmail,
                name: company.name,
                address: company.address
            },
            clientCompanyDetails: req.body.clientCompanyDetails,
            items: req.body.items,
            taxRate: req.body.taxRate
        };
        const response = yield (0, InvoiceUtils_1.createInvoice)(invoice);
        if (response.success) {
            return res.status(200).json({ success: true });
        }
        else {
            return res.status(400).json({ error: response.error });
        }
    }
}));
