import { Router } from "express";
import { SessionController } from "../controllers/sessions-controller";

export const sessionRoutes = Router()
const controller = new SessionController()


sessionRoutes.post('/', controller.create )
