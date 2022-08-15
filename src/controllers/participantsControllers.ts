import { User } from "@prisma/client";
import { Request, Response } from "express";

import participantsServices, { createParticipantData } from "../services/participantsServices.js";


export async function createParticipants(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);
    const user: User = res.locals.user;
    const participants: createParticipantData[] = req.body;
    
    await participantsServices.createParticipants(participants, user.id, tableId);
    await participantsServices.createUserAsParticipant(user, tableId);

    res.sendStatus(201);
}

export async function getParticipants(req: Request, res: Response) {
    const tableId = Number(req.params.tableId);

    const participants = await participantsServices.getParticipants(tableId);
    res.send(participants);
}
