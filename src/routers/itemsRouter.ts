import { Router } from "express";

import * as C from "../controllers/itemsControllers.js";
import * as M from "../middleware/itemsMiddleware.js";
import tokenValidation from "../middleware/tokenMiddleware.js";

const itemsRouter = Router();

itemsRouter.post('/items/:tableId', 
    tokenValidation, 
    M.validateTableId, 
    M.validateItemsData, 
    C.createItems
);

itemsRouter.get('/items/:tableId', 
    tokenValidation, 
    M.validateTableId,
    C.getTableItems
);

itemsRouter.get('/items/participants/:tableId', 
    tokenValidation, 
    M.validateTableId, 
    C.getParticipantsItems
);

export default itemsRouter;