"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const companySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    owner: { type: String, required: true },
    password: { type: String, required: true },
    members: { type: [String], default: [] },
});
exports.companyModel = mongoose_1.default.model('companies', companySchema);
exports.companyModel.createIndexes();
