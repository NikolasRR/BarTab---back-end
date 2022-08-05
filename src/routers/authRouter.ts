import { Router } from "express";

import * as controllers from "../controllers/authControllers.js";
import * as middlewares from "../middleware/authMiddlewares.js";

const authRouter = Router();

authRouter.post('/sign-up', middlewares.validateEmailAndPassword, controllers.signUp);
authRouter.post('/sign-in', middlewares.validateEmailAndPassword, controllers.signIn);

export default authRouter;