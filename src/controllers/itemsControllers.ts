import { Request, Response } from "express";

import itemsService, { ReceivedItemData } from "../services/itemsService.js";

export async function createItems(req: Request, res: Response) {
    const tableId = Number(req.headers.tableid);
    const items: ReceivedItemData[] = req.body.items;
    
    await itemsService.createItems(items, tableId);
    
    await itemsService.createParticipantItemRelation(items, tableId);

    res.sendStatus(201);
}
