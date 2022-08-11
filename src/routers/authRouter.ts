import { Router } from "express";

import * as C from "../controllers/authControllers.js";
import * as M from "../middleware/authMiddlewares.js";

const authRouter = Router();

authRouter.post('/sign-up', 
    M.validateSignUp, 
    C.signUp
);

authRouter.post('/sign-in',
    M.validateSignIn, 
    C.signIn
);

export default authRouter;