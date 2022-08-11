import { NextFunction, Request, Response } from "express";

import tableRepository from "../repositories/tablesRespository.js";
import { itemsSchema } from "../schemas/itemsSchema.js";

export async function validateTableId(req: Request, res: Response, next: NextFunction) {
    const tableId = Number(req.params.tableId);
    if (!tableId) throw { type: "request format", details: "table" };

    const table = await tableRepository.findById(tableId);
    if (!table) throw { type: "not found", details: "table" };

    next();
}

export async function validateItemsData(req: Request, res: Response, next: NextFunction) {
    const validation = itemsSchema.validate(req.body, { abortEarly: false });
    if (validation.error) throw { type: "request format", message: validation.error };

    next();
}