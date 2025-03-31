import { Router } from "express";
import { TeamsMembersController } from "../controllers/teams-members";
import { authenticate } from "../middlewares/authenticate";
import { verifyAuthorization } from "../middlewares/verifyAuthorization";


export const teamMembersRoutes = Router()
const controller = new TeamsMembersController()

teamMembersRoutes.use(authenticate)
teamMembersRoutes.use(verifyAuthorization(['admin']))

teamMembersRoutes.post('/', controller.create )
teamMembersRoutes.get('/', controller.index)
teamMembersRoutes.delete('/:id', controller.remove)

