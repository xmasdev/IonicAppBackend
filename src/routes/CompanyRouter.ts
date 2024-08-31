import express from 'express';
import { getMembersRouter } from './company/getMembers';
import { createInvoiceRouter } from './company/createInvoice';
import { getInvoicesRouter } from './company/getInvoices';

export const CompanyRouter = express.Router();

CompanyRouter.use('/get-members', getMembersRouter);
CompanyRouter.use('/create-invoice', createInvoiceRouter);
CompanyRouter.use('/get-invoices', getInvoicesRouter);

CompanyRouter.get('/', (req, res) => {
  res.send("Auth Router Working Correctly")
})