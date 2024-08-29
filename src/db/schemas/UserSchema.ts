import mongoose from "mongoose";

export interface UserInterface {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserInterface>({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

export const userModel = mongoose.model<UserInterface>('users', userSchema);

userModel.createIndexes();
