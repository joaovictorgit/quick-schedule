import { ScheduleModel } from "../models/scheduleModel";
import { Schedule } from "../types/schedule";
import { ScheduleStatus } from "../utils/constants";

export class ScheduleService {
  async getAllSchedulesByUserId(userId: string): Promise<Schedule[] | []> {
    return await ScheduleModel.find({ userId });
  }

  async create(data: Partial<Schedule>): Promise<Schedule> {
    return await ScheduleModel.create(data);
  }

  async hasScheduleConflict(resourceId: string, startDate: Date, endDate: Date): Promise<Boolean> {
    const conflict = await ScheduleModel.findOne({
      resourceId,
      status: {
        $in: [ScheduleStatus.approved, ScheduleStatus.pending],
      },
      startDate: { $lt: endDate },
      endDate: { $gt: startDate }
    });

    return Boolean(conflict);
  }

  async update(id: string, data: Partial<Schedule>): Promise<Schedule | null> {
    return await ScheduleModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<Schedule | null> {
    return await ScheduleModel.findByIdAndDelete(id);
  }
};