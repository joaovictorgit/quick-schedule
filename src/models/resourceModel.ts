import { model, Schema } from "mongoose";
import { Resource } from "../types/resource";

const ResourceSchema = new Schema<Resource>({
  name: { type: String, required: true, },
  type: { type: String, required: true},
  status: { type: String, required: true, },
  ownerId: { type: String, required: true, }
}, { timestamps: true })

export const ResourceModel = model<Resource>('Resource', ResourceSchema);