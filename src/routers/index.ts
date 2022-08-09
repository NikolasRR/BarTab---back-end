import { Router } from "express";

import authRouter from "./authRouter.js";
import itemsRouter from "./itemsRouter.js";
import participantsRouter from "./participantsRouter.js";
import tablesRouter from "./tablesRouter.js";

const router = Router();

router.use(authRouter);
router.use(tablesRouter);
router.use(participantsRouter);
router.use(itemsRouter);

export default router;