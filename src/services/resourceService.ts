import { ResourceModel } from "../models/resourceModel";
import { Resource } from "../types/resource";
import { ResourceStatus } from "../utils/constants";

export class ResourceService {
  async getAllByOwnerId(ownerId: string): Promise<Resource[] | []> {
    return await ResourceModel.find({ ownerId });
  }

  async create(data: Partial<Resource>): Promise<Resource> {
    return await ResourceModel.create(data);
  }

  async update(id: string, data: Partial<Resource>): Promise<Resource | null> {
    return await ResourceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string, data: Partial<Resource>): Promise<Resource | null> {
    return await ResourceModel.findByIdAndUpdate(id, data, { new: true });
  }

  async getAllResources(): Promise<Resource[] | []> {
    return await ResourceModel.find({ status: ResourceStatus.approved });
  }

  async getResourceById(id: string): Promise<Resource | null> {
    return await ResourceModel.findById(id);
  }
};