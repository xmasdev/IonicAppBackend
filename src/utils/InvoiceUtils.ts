import { invoiceModel, InvoiceInterface } from "../db/schemas/InvoiceSchema";
import {z} from 'zod';

const InvoiceZod = z.object({
  companyDetails: z.object({
    email: z.string().email(),
    name: z.string(),
    address: z.string(),
  }),
  clientCompanyDetails: z.object({
    email: z.string().email(),
    name: z.string(),
    address: z.string(),
  }),
  items: z.array(z.object({
    description: z.string(),
    price: z.string(),
  })),
  taxRate: z.string()
});


export const createInvoice = async (invoice: InvoiceInterface) => {
  try {
    const invoiceData = InvoiceZod.parse(invoice);
    await invoiceModel.create(invoiceData);
    return {success: true};
  } catch (error) {
    return {error: error};
  }
}

export const getInvoices = async (companyEmail: string) => {
  try {
    const invoices = await invoiceModel.find({'companyDetails.email': companyEmail});
    return {success: true, invoices};
  } catch (error) {
    return {error: error};
  }
}