import { Request, Response } from "express";

import authService, { UserData } from "../services/authServices.js";

export async function signUp(req: Request, res: Response) {
    const newUser: UserData = req.body;

    await authService.createNewUser(newUser);

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const user: UserData = req.body;

    const token = await authService.logUserIn(user);

    res.cookie('token', token, { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(200);
}

export async function signOff(req: Request, res: Response) {
    res.cookie('token', "", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(200);
}