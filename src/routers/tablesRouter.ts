import { Router } from "express";

import * as M from "../middleware/tablesMiddleware.js";
import * as C from "../controllers/tablesControllers.js";
import tokenValidation from "../middleware/tokenMiddleware.js";

const tablesRouter = Router();

tablesRouter.post('/tables', 
    tokenValidation, 
    M.validateTable, 
    C.create
);

export default tablesRouter;