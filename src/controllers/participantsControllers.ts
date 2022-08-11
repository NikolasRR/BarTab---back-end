import { Request, Response } from "express";

import participantsService, { participantsData } from "../services/participantsService.js";


export async function createParticipants(req: Request, res: Response) {
    const tableId = req.params.tableId;
    const userId: number = res.locals.user.id;
    const participants: participantsData = req.body;
    
    await participantsService.createParticipants(participants, userId, Number(tableId));

    res.sendStatus(201);
}

export async function getParticipants(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);

    const participants = await participantsService.getParticipants(tableId);
    res.send(participants);
}
