import { Router } from "express";

import authRouter from "./authRouter.js";
import participantsRouter from "./participantsRouter.js";
import tablesRouter from "./tablesRouter.js";

const router = Router();

router.use(authRouter);
router.use(tablesRouter);
router.use(participantsRouter);

export default router;