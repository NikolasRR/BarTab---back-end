import { NextFunction, Request, Response } from "express";

import { signUpSchema } from "../schemas/authSchemas.js";

export async function validateEmailAndPassword(req: Request, res: Response, next: NextFunction) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) throw { type: "request format", message: validation.error };

    next();
}