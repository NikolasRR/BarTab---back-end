import { Router } from "express";

import * as C from "../controllers/participantsControllers.js";
import * as M from "../middleware/participantsMiddleware.js";
import tokenValidation from "../middleware/tokenMiddleware.js";

const participantsRouter = Router();

participantsRouter.post('/participants/:tableId', 
    tokenValidation,
    M.validateTableId,
    M.validateParticipants,
    C.createParticipants
);

participantsRouter.get('/participants/:tableId',
    tokenValidation,
    M.validateTableId,
    C.getParticipants
);

export default participantsRouter;