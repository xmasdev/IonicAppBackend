import express from 'express';
import { getMembers } from '../../utils/CompanyUtils';
import { AuthMiddleware } from '../../middleware/AuthMiddleware';

export const getMembersRouter = express.Router();

getMembersRouter.post('/', AuthMiddleware,  async (req, res) => {
  const companyEmail = req.body.email;
  const memberEmail = req.body.user.email;
  const result = await getMembers(memberEmail, companyEmail);
  if(result.success){
    return res.status(200).json({members: result.members});
  }
  return res.status(400).json({error: result.error});
});