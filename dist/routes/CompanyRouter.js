"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = __importDefault(require("express"));
const getMembers_1 = require("./company/getMembers");
const createInvoice_1 = require("./company/createInvoice");
const getInvoices_1 = require("./company/getInvoices");
exports.CompanyRouter = express_1.default.Router();
exports.CompanyRouter.use('/get-members', getMembers_1.getMembersRouter);
exports.CompanyRouter.use('/create-invoice', createInvoice_1.createInvoiceRouter);
exports.CompanyRouter.use('/get-invoices', getInvoices_1.getInvoicesRouter);
exports.CompanyRouter.get('/', (req, res) => {
    res.send("Auth Router Working Correctly");
});
