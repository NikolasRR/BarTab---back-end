import { Request, Response } from "express";

import itemsService, { ReceivedItemData } from "../services/itemsService.js";

export async function createItems(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const items: ReceivedItemData[] = req.body;
    
    await itemsService.createItems(items, tableId);
    
    await itemsService.createItemParticipantRelation(items, tableId);

    res.sendStatus(201);
}

export async function getTableItems(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const items = await itemsService.getTableItems(tableId);
    
    res.send(items);
}

export async function getParticipantsItems(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const participantsItems = await itemsService.getParticipantsItems(tableId);
    
    res.send(participantsItems);
}
