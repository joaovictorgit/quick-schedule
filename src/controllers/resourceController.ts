import { Request, Response } from "express";
import { ResourceService } from "../services/resourceService";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createResourceSchema, findResourceSchema } from "../schemas/resource/resourceSchema";
import { uuid } from "uuidv4";
import { ResourceStatus, ResourceType } from "../utils/constants";

export class ResourceController {
  constructor(
    private resourceService = new ResourceService()
  ) {}

  getAllResourceOwnerId = async (req: AuthRequest, res: Response) => {
    try {
      const ownerId = req.userId as string;

      if (!ownerId?.trim()) {
        return res.status(400).json('Parâmetro obrigatório não encontrado!');
      }

      const resources = await this.resourceService.getAllByOwnerId(ownerId);

      return res.status(200).json(resources);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  createResource = async (req: AuthRequest, res: Response) => {
    try {
      const {
        name,
        type,
        description,
      } = req.body as {
        name: string,
        type: string,
        description: string,
      }

      const result = createResourceSchema.safeParse({ body: { name, type, description } });
      const ownerId = req.userId as string;

      if (!result.success || !ownerId?.trim()) {
        return res.status(400).json('Parâmetros obrigatórios não encontrados!');
      }

      const data = {
        ownerId,
        name,
        description,
        type: type as ResourceType,
        status: ResourceStatus.pending
      };

      const resource = await this.resourceService.create(data);

      return res.status(201).json(resource);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  updateResourceById = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;

      const {
        name,
        type,
        description,
      } = req.body as {
        name: string,
        type: string,
        description: string,
      }

      const result = createResourceSchema.safeParse({ body: { name, type, description } });
      const resultFindResource = findResourceSchema.safeParse({ params: { id } })
      if (!result.success  || !resultFindResource.success) {
        return res.status(400).json('Parâmetros obrigatórios não encontrados!');
      }

      const resources = await this.resourceService.update(id, {
        name,
        type: type as ResourceType,
        description,
      });

      return res.status(200).json(resources);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  deleteResourceById = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;

      const result = findResourceSchema.safeParse({ params: { id } })
      if (!result.success) {
        return res.status(400).json('Parâmetro obrigatório não encontrado!');
      }

      const resources = await this.resourceService.delete(id, {
        status: ResourceStatus.deleted
      });

      return res.status(200).json(resources);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  getAllResources = async (req: AuthRequest, res: Response) => {
    try {
      const resources = await this.resourceService.getAllResources();

      return res.status(200).json(resources);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  getResource = async (req: AuthRequest, res: Response) => {
    try {
      const id = req.params.id as string;

      const result = findResourceSchema.safeParse({ params: { id } })
      if (!result.success) {
        return res.status(400).json('Parâmetro obrigatório não encontrado!');
      }

      const resource = await this.resourceService.getResourceById(id);

      if (!resource) {
        return res.status(400).json('Recurso não encontrado!');
      }

      return res.status(200).json(resource);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
};