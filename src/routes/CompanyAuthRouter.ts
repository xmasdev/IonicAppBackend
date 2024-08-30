import express from 'express';
import { companyLoginRouter } from './auth-company/join';
import { companySignupRouter } from './auth-company/register';

export const CompanyAuthRouter = express.Router();

CompanyAuthRouter.use(companyLoginRouter);
CompanyAuthRouter.use(companySignupRouter);

CompanyAuthRouter.get('/', (req, res) => {
  res.send("Auth Router Working Correctly")
})