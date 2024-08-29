import express from 'express';
import { loginRouter } from './auth/login';
import { signupRouter } from './auth/signup';

export const AuthRouter = express.Router();

AuthRouter.use(loginRouter);
AuthRouter.use(signupRouter);

AuthRouter.get('/', (req, res) => {
  res.send("Auth Router Working Correctly")
})