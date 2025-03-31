import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { verifyAuthorization } from "../middlewares/verifyAuthorization";
import { TasksController } from "../controllers/tasks-controller";


export const tasksRoutes = Router()
const controller = new TasksController()

tasksRoutes.post('/', authenticate, verifyAuthorization(['admin']), controller.create)
tasksRoutes.get('/', authenticate, verifyAuthorization(['admin', 'member']), controller.index)
tasksRoutes.patch('/:task_id', authenticate, verifyAuthorization(['admin','member']), controller.update)

