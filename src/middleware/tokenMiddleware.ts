import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization;
    if (!token) {
        throw { type: "request format", details: "token" }
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = user;

    next();

}

export default tokenValidation;