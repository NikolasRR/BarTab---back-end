import { NextFunction, Request, Response } from "express";

import { signInSchema, signUpSchema } from "../schemas/authSchemas.js";

export async function validateSignUp(req: Request, res: Response, next: NextFunction) {
    const validation = signUpSchema.validate(req.body, { abortEarly: false });
    if (validation.error) throw { type: "request format", message: validation.error };

    next();
}

export async function validateSignIn(req: Request, res: Response, next: NextFunction) {
    const validation = signInSchema.validate(req.body, { abortEarly: false });
    if (validation.error) throw { type: "request format", message: validation.error };

    next();
}