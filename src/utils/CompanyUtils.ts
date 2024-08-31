import {z} from 'zod';
import { CompanyInterface, companyModel } from '../db/schemas/CompanySchema';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;


// Zod Schema to validate user data
const companyZod = z.object({
  name: z.string({message: 'Name is required'}),
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
  address: z.string({message: 'Address is required'}),
  owner: z.string({message: 'Owner is required'}).email({message: 'Invalid email address'}),
  members: z.string().array(),
})

export const createCompany = async (company: CompanyInterface) => {
  const validatedCompany = companyZod.parse(company);
  validatedCompany.password = await bcrypt.hash(validatedCompany.password, SALT_ROUNDS);
  try {
    const exists = await companyModel.exists({email: validatedCompany.email});
    if(exists){
      return {error: 'Company with this email already exists'};
    }
    const newCompany = await companyModel.create(validatedCompany);
    return {succes: true};
  }
  catch (error) {
    return {error: error};
  }
}

export const checkCompany = async (email: string, password: string) => {
  try {
    const company = await companyModel.find({email});
    if(!company){
      return false;
    }
    const match = await bcrypt.compare(password, company[0].password);
    return match;
  } catch (error) {
    return false;
  }
}

export const getCompanyDetails = async (email: string) => {
  try {
    const company = await companyModel.find({email});
    if(!company){
      return {error: 'Company not found'};
    }
    return {success: true, company: company[0]};
  } catch (error) {
    return {error: error};
  }
}

export const addMember = async (companyEmail: string, memberEmail: string) => {
  try {
    const company = await companyModel.find({email: companyEmail});
    if(!company){
      return {error: 'Company not found'};
    }
    const members = company[0].members;
    if(members.includes(memberEmail)){
      return {error: 'Member already exists'};
    }
    members.push(memberEmail);
    await companyModel.updateOne({email: companyEmail}, {members});
    return {success: true};
  } catch (error) {
    return {error: error};
  }
}

export const getMembers = async (memberEmail: string, companyEmail: string) => {
  try {
    const company = await companyModel.find({email: companyEmail});
    if(!company){
      return {error: 'Company not found'};
    }
    if (company[0].owner !== memberEmail && !company[0].members.includes(memberEmail)){
      return {error: 'Unauthorized'};
    }
    return {success: true, members: company[0].members};
  } catch (error) {
    return {error: error};
  }
}