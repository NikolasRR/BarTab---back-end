import express from "express";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import router from "./routers/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://vercel.com/nikolasrr/bar-tab-front-end"] }));
app.use(router);
app.use(errorHandler);

export default app;