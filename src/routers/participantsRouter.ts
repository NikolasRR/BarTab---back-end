import { Router } from "express";

import * as C from "../controllers/participantsControllers.js"
import tokenValidation from "../middleware/tokenMiddleware.js";

const participantsRouter = Router();

participantsRouter.post('/participants', tokenValidation, C.createParticipants);

export default participantsRouter;