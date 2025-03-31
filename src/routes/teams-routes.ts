import { Router } from "express";
import { TeamsController } from "../controllers/teams-controller";
import { authenticate } from "../middlewares/authenticate";
import { verifyAuthorization } from "../middlewares/verifyAuthorization";


export const teamRoutes = Router()
const controller = new TeamsController()

teamRoutes.use(authenticate)
teamRoutes.use(verifyAuthorization(['admin']))

teamRoutes.post('/', controller.create)
teamRoutes.get('/', controller.index)
teamRoutes.put('/:id', controller.update)
teamRoutes.delete('/:id', controller.remove)
