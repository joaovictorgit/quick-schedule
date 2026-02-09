import { model, Schema } from "mongoose";
import { Schedule } from "../types/schedule";

const ScheduleSchema = new Schema<Schedule>({
  resourceId: { type: String, required: true },
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true }
});

export const ScheduleModel = model<Schedule>('Schedule', ScheduleSchema);