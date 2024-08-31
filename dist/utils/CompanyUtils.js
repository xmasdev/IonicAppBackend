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
exports.getMembers = exports.addMember = exports.getCompanyDetails = exports.checkCompany = exports.createCompany = void 0;
const zod_1 = require("zod");
const CompanySchema_1 = require("../db/schemas/CompanySchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
// Zod Schema to validate user data
const companyZod = zod_1.z.object({
    name: zod_1.z.string({ message: 'Name is required' }),
    email: zod_1.z.string().email({ message: 'Invalid email address' }),
    password: zod_1.z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    address: zod_1.z.string({ message: 'Address is required' }),
    owner: zod_1.z.string({ message: 'Owner is required' }).email({ message: 'Invalid email address' }),
    members: zod_1.z.string().array(),
});
const createCompany = (company) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedCompany = companyZod.parse(company);
    validatedCompany.password = yield bcrypt_1.default.hash(validatedCompany.password, SALT_ROUNDS);
    try {
        const exists = yield CompanySchema_1.companyModel.exists({ email: validatedCompany.email });
        if (exists) {
            return { error: 'Company with this email already exists' };
        }
        const newCompany = yield CompanySchema_1.companyModel.create(validatedCompany);
        return { succes: true };
    }
    catch (error) {
        return { error: error };
    }
});
exports.createCompany = createCompany;
const checkCompany = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield CompanySchema_1.companyModel.find({ email });
        if (!company) {
            return false;
        }
        const match = yield bcrypt_1.default.compare(password, company[0].password);
        return match;
    }
    catch (error) {
        return false;
    }
});
exports.checkCompany = checkCompany;
const getCompanyDetails = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield CompanySchema_1.companyModel.find({ email });
        if (!company) {
            return { error: 'Company not found' };
        }
        return { success: true, company: company[0] };
    }
    catch (error) {
        return { error: error };
    }
});
exports.getCompanyDetails = getCompanyDetails;
const addMember = (companyEmail, memberEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield CompanySchema_1.companyModel.find({ email: companyEmail });
        if (!company) {
            return { error: 'Company not found' };
        }
        const members = company[0].members;
        if (members.includes(memberEmail)) {
            return { error: 'Member already exists' };
        }
        members.push(memberEmail);
        yield CompanySchema_1.companyModel.updateOne({ email: companyEmail }, { members });
        return { success: true };
    }
    catch (error) {
        return { error: error };
    }
});
exports.addMember = addMember;
const getMembers = (memberEmail, companyEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield CompanySchema_1.companyModel.find({ email: companyEmail });
        if (!company) {
            return { error: 'Company not found' };
        }
        if (company[0].owner !== memberEmail && !company[0].members.includes(memberEmail)) {
            return { error: 'Unauthorized' };
        }
        return { success: true, members: company[0].members };
    }
    catch (error) {
        return { error: error };
    }
});
exports.getMembers = getMembers;
