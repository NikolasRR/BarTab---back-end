import { NextFunction, Request, Response } from "express";
import { participantsSchema } from "../schemas/participantsSchema.js";

import { participantsData } from "../services/participantsService.js";

export async function validateParticipants(req: Request, res: Response, next: NextFunction) {
    const participants: participantsData = req.body;
    if (!participants) throw {type: "request format", details: "participants"};
    
    const validation = participantsSchema.validate(participants);
    if (validation.error) throw { type: "request format", message: validation.error };

    next();
}