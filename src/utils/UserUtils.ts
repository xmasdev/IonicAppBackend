import {z} from 'zod';
import { UserInterface, userModel } from '../db/schemas/UserSchema';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;


// Zod Schema to validate user data
const userZod = z.object({
  name: z.string({message: 'Name is required'}),
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
})

export const createUser = async (user: UserInterface) => {
  const validatedUser = userZod.parse(user);
  validatedUser.password = await bcrypt.hash(validatedUser.password, SALT_ROUNDS);
  try {
    const exists = await userModel.exists({email: validatedUser.email});
    if(exists){
      return {error: 'User already exists'};
    }
    const newUser = await userModel.create(validatedUser);
    return {succes: true};
  }
  catch (error) {
    return {error: error};
  }
}

export const checkUser = async (email: string, password: string) => {
  try {
    const user = await userModel.find({email});
    if(!user){
      return false;
    }
    const match = await bcrypt.compare(password, user[0].password);
    return match;
  } catch (error) {
    return false;
  }
}