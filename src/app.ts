import express from "express";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import router from "./routers/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

const allowed = ["https://bar-tab-front-end.vercel.app", "http://localhost:3000", "https://bar-tab-front-end.vercel.app/", "https://bar-tab-front-end-nikolasrr.vercel.app"]

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowed }));
app.use(router);
app.use(errorHandler);

export default app;