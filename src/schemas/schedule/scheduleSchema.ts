import { z } from 'zod';

export const scheduleSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'ID do usuário inválido'),
    resourceId: z.string().min(1, 'ID do recurso inválido'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  })
  .refine(
    (data) => !isNaN(data.startDate.getTime()),
    {
      message: 'Data inicial inválida',
      path: ['startDate'],
    }
  )
  .refine(
    (data) => !isNaN(data.endDate.getTime()),
    {
      message: 'Data final inválida',
      path: ['endDate'],
    }
  )
  .refine(
    (data) => data.startDate < data.endDate,
    {
      message: 'startDate deve ser menor que endDate',
      path: ['endDate'],
    }
  ),
});

export const findScheduleSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID inválido')
  })
});

export type scheduleSchema = z.infer<typeof scheduleSchema>['body'];
export type findScheduleSchema = z.infer<typeof findScheduleSchema>['params'];
