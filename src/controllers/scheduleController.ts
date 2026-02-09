import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ScheduleService } from "../services/scheduleService";
import { findScheduleSchema, scheduleSchema } from "../schemas/schedule/scheduleSchema";
import { ScheduleStatus } from "../utils/constants";

export class ScheduleController {
  constructor(
    private scheduleService = new ScheduleService()
  ) {}

  getSchedulesByUserId = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId as string;

      if (!userId?.trim()) {
        return res.status(400).json('Parâmetro obrigatório não encontrado!');
      }

      const schedules = await this.scheduleService.getAllSchedulesByUserId(userId);

      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  createSchedule = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.userId as string;
      const {
        resourceId,
        startDate,
        endDate,
      } = req.body as {
        resourceId: string,
        startDate: Date,
        endDate: Date,
      };

      const body = { resourceId, userId, startDate, endDate };
      const result = scheduleSchema.safeParse({ body: body });

      if (!result.success) {
        console.log(result.error.format());
        return res.status(400).json('Parâmetros obrigatórios não encontrados!');
      }

      const hasConflict = await this.scheduleService.hasScheduleConflict(
        resourceId,
        startDate,
        endDate
      );

      if (hasConflict) {
        return res.status(400).json('Já existe uma reserva ativa para esse recurso neste período');
      }

      const data = {
        ...body,
        status: ScheduleStatus.pending
      };

      const schedule = await this.scheduleService.create(data);

      return res.status(201).json(schedule);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  updateScheduleById = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const userId = req.userId as string;

      const {
        resourceId,
        startDate,
        endDate,
      } = req.body as {
        resourceId: string,
        startDate: Date,
        endDate: Date,
      };

      const body = { resourceId, userId, startDate, endDate };
      const resultId = findScheduleSchema.safeParse({ params: { id } });
      const result = scheduleSchema.safeParse({ body: body });

      if (!resultId.success || !result.success) {
        return res.status(400).json('Parâmetros obrigatórios não encontrados!');
      }

      const hasConflict = await this.scheduleService.hasScheduleConflict(
        resourceId,
        startDate,
        endDate,
      );

      if (hasConflict) {
        return res.status(400).json('Já existe uma reserva ativa para esse recurso neste período');
      }

      const schedule = await this.scheduleService.update(id, body);

      return res.status(200).json(schedule);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  deleteScheduleById = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = findScheduleSchema.safeParse({ params: { id } });

      if (!result.success) {
        return res.status(400).json('Parâmetro obrigatório não encontrado');
      }

      const schedule = await this.scheduleService.delete(id);

      return res.status(200).json(schedule);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};