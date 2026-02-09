import { ScheduleStatus } from "../utils/constants";

export type Schedule = {
  _id: string;
  resourceId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: ScheduleStatus;
  createdAt: Date;
  updatedAt: Date;
};