import express from 'express';
import { checkCompany } from '../../utils/CompanyUtils';
import { addMember } from '../../utils/CompanyUtils';
import { AuthMiddleware } from '../../middleware/AuthMiddleware';

export const companyLoginRouter = express.Router();

companyLoginRouter.post('/join', AuthMiddleware, async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({error: 'All fields are required'});
  }
  if (await checkCompany(email, password)) {
    const {email: memberEmail} = req.body.user;
    const response = await addMember(email, memberEmail);
    if (response.success){
     return res.json({success: true})
    }
    return res.status(400).json({error: response.error});
  }
  return res.status(400).json({error: 'Invalid credentials'});
});