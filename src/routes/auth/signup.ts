import express from 'express';
import { createUser } from '../../utils/UserUtils';
import { generateJWT } from '../../utils/JWTUtils';

export const signupRouter = express.Router();

signupRouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({error: 'All fields are required'});
  }
  const user = {name, email, password};
  try {
    const response = await createUser(user);
    if (response.error) {
      return res.status(400).json({error: response.error});
    }
    const token = generateJWT({email});
    return res.status(201).json({success: true, token});
  }
  catch (error) {
    console.error(error)
    return res.status(500).json({error: 'Internal Server Error'});
  }
});