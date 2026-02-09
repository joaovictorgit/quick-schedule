import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { userSchema, findUserSchema, signInUserSchema } from "../schemas/user/userSchema";
import { compare, hash } from "bcrypt";
import { uuid } from "uuidv4";
import jwt, { Secret } from "jsonwebtoken";
import { env } from "../config/env";

export class UserController {
  constructor(
    private userService = new UserService()
  ) {}

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = findUserSchema.safeParse({ params: { id } });

      if (!result.success) {
        return res.status(400).json('Parâmetro não encontrado!');
      }

      const user = await this.userService.getById(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  createUser = async (req: Request, res: Response) =>{
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const result = userSchema.safeParse({ body: data });
      
      if (!result.success) {
        return res.status(400).json('Parêmetros obrigatórios não encontrados!');
      }

      const newPassword = await hash(data.password, 10);
      data.password = newPassword;
      const id = uuid().toString();
      const user = await this.userService.create(data);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  updateUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      const resultId = findUserSchema.safeParse({ params: { id } });
      const result = userSchema.safeParse({ body: data });

      if (!resultId.success || !result.success) {
        return res.status(400).json('Parâmetro não encontrado!');
      }

      const newPassword = await hash(data.password, 10);
      data.password = newPassword;

      const user = await this.userService.update(id, data);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

  deleteUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = findUserSchema.safeParse({ params: { id } });

      if (!result.success) {
        return res.status(400).json('Parâmetro não encontrado!');
      }

      const user = await this.userService.delete(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  signInUser = async (req: Request, res: Response) => {
    try {
      const {
        email,
        password
      } = req.body as {
        email: string,
        password: string,
      };

      const result = signInUserSchema.safeParse({ body: { email, password } });

      if (!result.success) {
        return res.status(400).json('Parâmetros obrigatórios não encontrados!');
      }      

      const user = await this.userService.getByEmail(email);

      if (!user) {
        return res.status(400).json('Usuário não encontrado!');
      }

      const hashPass = await compare(password, user.password);

      if (!hashPass) {
        return res.status(400).json('Senha incorreta!');
      }
      
      const token = jwt.sign(
        {
          id: user._id,
        },
        env.secret,
        { expiresIn: '1d' }
      );

      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }
};