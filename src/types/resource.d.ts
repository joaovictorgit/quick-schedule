import { ResourceStatus, ResourceType } from "../utils/constants";

export type Resource = {
  _id: string;
  name: string;
  type: ResourceType;
  description: string;
  status: ResourceStatus;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};