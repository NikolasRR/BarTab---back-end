import { Request, Response } from "express";

import { authService, UserData } from "../services/authServices.js";

export async function signUp(req: Request, res: Response) {
    const newUser: UserData = req.body;

    await authService.createNewUser(newUser);

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const user: UserData = req.body;

    const token = await authService.logUserIn(user);

    res.send({ token: token });
}