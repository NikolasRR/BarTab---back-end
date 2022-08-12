import { User } from "@prisma/client";
import { Request, Response } from "express";

import participantsService, { createParticipantData } from "../services/participantsService.js";


export async function createParticipants(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const user: User = res.locals.user;
    const participants: createParticipantData[] = req.body;
    
    await participantsService.createParticipants(participants, user, tableId);
    await participantsService.createUserAsParticipant(user, tableId);

    res.sendStatus(201);
}

export async function getParticipants(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);

    const participants = await participantsService.getParticipants(tableId);
    res.send(participants);
}
