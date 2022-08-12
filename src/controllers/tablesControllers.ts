import { Request, Response } from "express";

import tableServices from "../services/tablesServices.js";

export async function create(req: Request, res: Response) {
    const tableName: string = res.locals.tableName;
    const userId: number = res.locals.user.id;

    const table = await tableServices.createNewTable(tableName, userId);

    res.status(201).send(table);
}

export async function get(req: Request, res: Response) {
    const userId: number = res.locals.user.id;

    const table = await tableServices.getCurrent(userId);

    res.send(table);
}
