import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { verifyAuthorization } from "../middlewares/verifyAuthorization";
import { TasksHistoriesController } from "../controllers/tasks-histories-controller";

export const taskHistoriesRoutes = Router()
const controller = new TasksHistoriesController()


taskHistoriesRoutes.get('/',authenticate, verifyAuthorization(['admin']), controller.index )