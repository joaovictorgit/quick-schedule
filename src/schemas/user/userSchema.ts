import { z } from 'zod';

export const userSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Nome deve ter no mínimo 1 caracter'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  }),
});

export const findUserSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, 'O ID é obrigatório'),
  }),
});

export const signInUserSchema = z.object({
  body: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  })
});

export type createUserSchema = z.infer<typeof userSchema>['body'];
export type findUserSchema = z.infer<typeof findUserSchema>['params'];
export type updateUserSchema = z.infer<typeof userSchema>['body'];
export type signInUserSchema = z.infer<typeof signInUserSchema>['body'];