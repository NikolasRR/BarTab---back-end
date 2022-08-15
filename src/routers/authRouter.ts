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

authRouter.post('/sign-off', 
    C.signOff
);

export default authRouter;