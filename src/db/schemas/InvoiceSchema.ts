import mongoose from "mongoose";

interface Item {
  description: string;
  price: string;
}

export interface InvoiceInterface {
  companyDetails: {
    name: string;
    email: string; // email of the company,
    address: string;
  }
  clientCompanyDetails: {
    name: string;
    email: string; // email of the client company,
    address: string;
  }
  items: Item[];
  taxRate: string;
}

const InvoiceSchema = new mongoose.Schema<InvoiceInterface>({
  companyDetails: {
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
  },
  clientCompanyDetails: {
    name: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
  },
  items: {
    type: [{description: String, price: String}],
    required: true
  },
  taxRate: {
    type: String,
    required: true
  }
});

export const invoiceModel = mongoose.model<InvoiceInterface>('Invoice', InvoiceSchema);