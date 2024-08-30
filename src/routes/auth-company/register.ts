import express from 'express';
import { createCompany } from '../../utils/CompanyUtils';
import { AuthMiddleware } from '../../middleware/AuthMiddleware';

export const companySignupRouter = express.Router();

companySignupRouter.post('/register', AuthMiddleware, async (req, res) => {
  const { name, email, password, address } = req.body;
  if(!name || !email || !password || !address){
    return res.status(400).json({error: 'All fields are required'});
  }
  const company = {name, email, password, address, owner: req.body.user.email, invoices: [], members: []};
  try {
    const response = await createCompany(company);
    if (response.error) {
      return res.status(400).json({error: response.error});
    }
    return res.status(201).json({success: true});
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Internal Server Error'});
  }
});