import z from "zod";

export const createResourceSchema = z.object({
  body: z.object({
    name: z.string().min(5, 'Nome deve ter no mínimo 5 caracteres'),
    type: z.string().min(1, 'Tipo do recurso deve ser obrigatório'),
    description: z.string().min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  })
});

export const findResourceSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, 'O ID é obrigatório'),
  }),
});

export type createResourceSchema = z.infer<typeof createResourceSchema>['body'];
export type findResourceSchema = z.infer<typeof findResourceSchema>['params'];