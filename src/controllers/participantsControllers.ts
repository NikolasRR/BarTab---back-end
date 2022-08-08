import { Request, Response } from "express";

import participantsService, { participantsData } from "../services/participantsService.js";


export async function createParticipants(req: Request, res: Response) {
    const tableId = req.headers.tableid;
    const userId: number = res.locals.user.id;
    const participants: participantsData = req.body;
    console.log(tableId);
    

    await participantsService.createParticipants(participants, userId, Number(tableId));

    res.sendStatus(201);
}
