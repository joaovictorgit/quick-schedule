import { UserModel } from "../models/userModel";
import { User } from "../types/user";

export class UserService {
  async getAll(): Promise<User[] | []> {
    return await UserModel.find();
  }

  async getById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async create(data: Partial<User>): Promise<User> {
    return await UserModel.create(data);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<User | null> {
    return await UserModel.findByIdAndDelete(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ email });
  }
};