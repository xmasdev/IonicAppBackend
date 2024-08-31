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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvoices = exports.createInvoice = void 0;
const InvoiceSchema_1 = require("../db/schemas/InvoiceSchema");
const zod_1 = require("zod");
const InvoiceZod = zod_1.z.object({
    companyDetails: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
    clientCompanyDetails: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
    items: zod_1.z.array(zod_1.z.object({
        description: zod_1.z.string(),
        price: zod_1.z.string(),
    })),
    taxRate: zod_1.z.string()
});
const createInvoice = (invoice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoiceData = InvoiceZod.parse(invoice);
        yield InvoiceSchema_1.invoiceModel.create(invoiceData);
        return { success: true };
    }
    catch (error) {
        return { error: error };
    }
});
exports.createInvoice = createInvoice;
const getInvoices = (companyEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const invoices = yield InvoiceSchema_1.invoiceModel.find({ 'companyDetails.email': companyEmail });
        return { success: true, invoices };
    }
    catch (error) {
        return { error: error };
    }
});
exports.getInvoices = getInvoices;
