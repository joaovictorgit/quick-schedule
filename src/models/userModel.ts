import { model, Schema } from "mongoose";
import { User } from "../types/user";

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

export const UserModel = model<User>('User', UserSchema);