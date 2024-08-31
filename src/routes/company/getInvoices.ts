import express from 'express';
import { getInvoices } from '../../utils/InvoiceUtils';
import { AuthMiddleware } from '../../middleware/AuthMiddleware'
import { getMembers } from '../../utils/CompanyUtils';
import { getCompanyDetails } from '../../utils/CompanyUtils';

export const getInvoicesRouter = express.Router();

getInvoicesRouter.post('/', AuthMiddleware,  async (req, res) => {
  const companyEmail = req.body.companyEmail;
  const memberEmail = req.body.user.email;
  const result = await getMembers(memberEmail, companyEmail);
  const company = await getCompanyDetails(companyEmail);
  if (!company.error){
    if (company.company?.owner === memberEmail){
      return res.status(200).json({success: true, invoices: (await getInvoices(companyEmail)).invoices, admin: true});
    }
  }
  if (result.success){
    if (result.members.includes(memberEmail)){
      const response = await getInvoices(companyEmail);
      if (response.success){
        return res.status(200).json({success: true, invoices: response.invoices, admin: false});
      } else {
        return res.status(400).json({error: response.error});
      }
    } else {
      return res.status(400).json({error: 'Unauthorized'});
    }
  }
  return res.status(400).json({error: result.error});
});