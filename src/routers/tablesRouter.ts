import { Router } from "express";

import * as M from "../middleware/tablesMiddleware.js";
import * as C from "../controllers/tablesControllers.js";
import tokenValidation from "../middleware/tokenMiddleware.js";

const tablesRouter = Router();

tablesRouter.post('/table', 
    tokenValidation, 
    M.validateTable, 
    C.create
);

tablesRouter.get('/table',
    tokenValidation,
    C.get
);

tablesRouter.delete('/table',
    tokenValidation,
    C.deleteCurent
);

export default tablesRouter;