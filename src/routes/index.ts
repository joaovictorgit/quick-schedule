import { Router } from "express";
import userRouter from "./userRouter";
import resourceRouter from "./resourceRouter";
import scheduleRouter from "./scheduleRouter";

const routes = Router();

routes.use('/users', userRouter);
routes.use('/resource', resourceRouter);
routes.use('/schedule', scheduleRouter);

export default routes;