import { Router } from "express";

import * as C from "../controllers/itemsControllers.js";
import tokenValidation from "../middleware/tokenMiddleware.js";

const itemsRouter = Router();

itemsRouter.post('/items', tokenValidation, C.createItems);

export default itemsRouter;