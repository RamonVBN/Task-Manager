import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { errorHandling } from "../middlewares/error-handling";
import { authenticate } from "../middlewares/authenticate";
import { verifyAuthorization } from "../middlewares/verifyAuthorization";

export const userRoutes = Router()
const controller = new UserController()

userRoutes.post('/', controller.create)
userRoutes.get('/',authenticate, verifyAuthorization(['admin']), controller.index )