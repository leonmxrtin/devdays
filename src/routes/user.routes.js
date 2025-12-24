import { Router } from "express";
import { validateCreateUser } from '../middlewares/user.middleware.js';
import { getUsers, getUser, addUser, removeUser } from '../controllers/user.controller.js';

export const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', validateCreateUser, addUser);
userRouter.delete('/users/:id', removeUser);