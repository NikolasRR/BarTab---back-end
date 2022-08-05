import express from "express";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";

import router from "./routers";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;