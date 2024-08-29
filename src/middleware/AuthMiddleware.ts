import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/JWTUtils";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if(!token){
    return res.status(401).json({error: 'Access Denied'});
  }
  const user = verifyJWT(token);
  if(!user){
    return res.status(401).json({error: 'Invalid Token'});
  }
  req.body.user = user;
  next();
}