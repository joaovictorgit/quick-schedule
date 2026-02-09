import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateMiddleware =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {

    const result: any = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: result.error.flatten(),
      });
    }

    // sobrescreve com dados validados
    req.body = result.data.body ?? req.body;
    req.params = result.data.params ?? req.params;
    req.query = result.data.query ?? req.query;

    next();
  };
