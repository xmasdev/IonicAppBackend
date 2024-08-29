import {z} from 'zod';
import { UserInterface, userModel } from '../db/schemas/UserSchema';


// Zod Schema to validate user data
const userZod = z.object({
  name: z.string({message: 'Name is required'}),
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 6 characters long'}),
})

export const createUser = async (user: UserInterface) => {
  const validatedUser = userZod.parse(user);
  try {
    const exists = await userModel.exists({email: validatedUser.email});
    if(exists){
      return {error: 'User already exists'};
    }
    const newUser = await userModel.create(validatedUser);
    return newUser;
  }
  catch (error) {
    return {error: error};
  }
}