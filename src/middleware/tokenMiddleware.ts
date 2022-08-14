import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export type TokenUser = {
    id: number
    email: string
    name: string
    iat: number
    exp: number 
}

async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token: string = req.cookies.token;
    
    if (!token) {
        throw { type: "request format", details: "token" }
    }
    
    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded: TokenUser) => {
        if (err) {
            console.log(err);
            
            throw { type: "request format", details: "jwt" };
        }
            res.locals.user = decoded;
    });

    next();
}

export default tokenValidation;