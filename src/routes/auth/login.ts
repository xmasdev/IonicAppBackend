import express from 'express';
import { checkUser } from '../../utils/UserUtils';
import { generateJWT } from '../../utils/JWTUtils';

export const loginRouter = express.Router();

loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    return res.status(400).json({error: 'All fields are required'});
  }
  if (await checkUser(email, password)) {
    const token = generateJWT({email});
    return res.status(200).json({success: true, token});
  }
  return res.status(400).json({error: 'Invalid credentials'});
});