import { Router } from "express";
import { ResourceController } from "../controllers/resourceController";
import authMiddleware from "../middlewares/authMiddleware";

const resourceRouter = Router();
const resourceController = new ResourceController();

resourceRouter.get('/', authMiddleware, resourceController.getAllResourceOwnerId);
resourceRouter.post('/', authMiddleware, resourceController.createResource);
resourceRouter.put('/:id', authMiddleware, resourceController.updateResourceById);
resourceRouter.delete('/:id', authMiddleware, resourceController.deleteResourceById);
resourceRouter.get('/approved', authMiddleware, resourceController.getAllResources);
resourceRouter.get('/:id', authMiddleware, resourceController.getResource);

export default resourceRouter;