import express from 'express';
import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { createInvoice } from '../../utils/InvoiceUtils';
import { getCompanyDetails } from '../../utils/CompanyUtils';

export const createInvoiceRouter = express.Router();

createInvoiceRouter.post('/', AuthMiddleware,  async (req, res) => {
  const companyEmail = req.body.companyEmail;
  const email = req.body.user.email;
  const companyResponse = await getCompanyDetails(companyEmail);
  if (companyResponse.success){
    let company = companyResponse.company;
    if (company.owner != email) {
      return res.status(400).json({error: 'You are not authorized to create invoice for this company'});
    }
    const invoice = {
      companyDetails: {
        email: companyEmail,
        name: company.name,
        address: company.address
      },
      clientCompanyDetails: req.body.clientCompanyDetails,
      items: req.body.items,
      taxRate: req.body.taxRate
      }
    const response = await createInvoice(invoice);
    if (response.success){
      return res.status(200).json({success: true});
    } else {
      return res.status(400).json({error: response.error});
    }
  }
});
