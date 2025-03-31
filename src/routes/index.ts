import { Router } from "express";

import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./sessions-routes";
import { teamRoutes } from "./teams-routes";
import { teamMembersRoutes } from "./team-members-routes";
import { tasksRoutes } from "./tasks-routes";
import { taskHistoriesRoutes } from "./tasks-histories-routes";

export const routes = Router()

routes.use('/users', userRoutes)
routes.use('/sessions', sessionRoutes)
routes.use('/teams', teamRoutes)
routes.use('/teams-members', teamMembersRoutes)
routes.use('/tasks', tasksRoutes)
routes.use('/tasks-histories', taskHistoriesRoutes )


