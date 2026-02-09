import Router from 'express';
import { ScheduleController } from '../controllers/scheduleController';
import authMiddleware from '../middlewares/authMiddleware';

const scheduleRouter = Router();
const scheduleController = new ScheduleController();

scheduleRouter.get('/:id', authMiddleware, scheduleController.getSchedulesByUserId);
scheduleRouter.post('/', authMiddleware, scheduleController.createSchedule);
scheduleRouter.put('/:id', authMiddleware, scheduleController.updateScheduleById);
scheduleRouter.delete('/:id', authMiddleware, scheduleController.deleteScheduleById);

export default scheduleRouter;