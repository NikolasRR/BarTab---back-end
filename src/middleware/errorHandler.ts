import { Request, Response, NextFunction } from "express";

type error = {
    type: string,
    details: string,
    message: string
};

export default async function errorHandler(error: error, req: Request, res: Response, next: NextFunction) {
    let code: number;
    
    switch (error.type) {
        case "conflict":
            code = 409;
            if (error.details === "test link") error.message = "link already registered";
            if (error.details === "email") error.message = "email not found";
            break;
        case "request format":
            code = 422;
            if (error.details === "token") error.message = "missing token";
            if (error.details === "jwt") error.message = "token invalid or expired";
            if (error.details === "groupBy") error.message = "group by clause missing";
            break;
        case "unauthorized":
            code = 401;
            error.message = "wrong password";
            break;
        case "not found":
            code = 404;
            if (error.details === "discipline") error.message = "discipline not found";
            if (error.details === "teacher") error.message = "teacher not found";
            if (error.details === "category") error.message = "category not found";
            if (error.details === "email") error.message = "email not found";
            break;
        default:
            code = 500;
            break;
    }
    
    res.status(code).send(error.message);
}