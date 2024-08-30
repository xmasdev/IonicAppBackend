import mongoose from "mongoose";

export interface CompanyInterface {
  name: string;
  email: string;
  address: string;
  invoices: string[];
  owner: string; //email of the owner,
  password: string; // to log in the company account,
  members: string[]; // email of the members of the company,
}

const companySchema = new mongoose.Schema<CompanyInterface>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  invoices: {type: [String], default: []},
  owner: {type: String, required: true},
  password: {type: String, required: true},
  members: {type: [String], default: []},
});

export const companyModel = mongoose.model<CompanyInterface>('companies', companySchema);

companyModel.createIndexes();
