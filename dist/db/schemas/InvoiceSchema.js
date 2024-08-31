"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InvoiceSchema = new mongoose_1.default.Schema({
    companyDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },
    clientCompanyDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
    },
    items: {
        type: [{ description: String, price: String }],
        required: true
    },
    taxRate: {
        type: String,
        required: true
    }
});
exports.invoiceModel = mongoose_1.default.model('Invoice', InvoiceSchema);
