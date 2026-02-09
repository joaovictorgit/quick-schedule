import { Router } from "express";
import { UserController } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/signin', userController.signInUser)
userRouter.get('/all', userController.getAllUsers);
userRouter.get('/:id', authMiddleware, userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', authMiddleware, userController.updateUserById);
userRouter.delete('/:id', authMiddleware, userController.deleteUserById);

export default userRouter;