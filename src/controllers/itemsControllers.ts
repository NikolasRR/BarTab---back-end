import { Request, Response } from "express";

import itemsServices, { ReceivedItemData } from "../services/itemsServices.js";

export async function createItems(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const items: ReceivedItemData[] = req.body;
    
    await itemsServices.createItems(items, tableId);
    
    await itemsServices.createItemParticipantRelation(items, tableId);

    res.sendStatus(201);
}

export async function getTableItems(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const items = await itemsServices.getTableItems(tableId);
    
    res.send(items);
}

export async function getParticipantsItems(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const participantsItems = await itemsServices.getParticipantsItems(tableId);
    
    res.send(participantsItems);
}
