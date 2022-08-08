import { NextFunction, Request, Response } from "express";

export async function validateTable(req: Request, res: Response, next: NextFunction) {
    const tableName: string = req.body.name;
    if (!tableName) throw {type: "request format", details: "table name"};
    
    res.locals.tableName = tableName;

    next();
}