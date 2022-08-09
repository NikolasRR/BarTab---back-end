import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { authRepository } from "../repositories/authRepository.js";

export type UserData = Omit<User, 'id'>

async function createNewUser(newUserData: UserData) {
    const emailAlreadyRegistered = await authRepository.getByEmail(newUserData.email);
    if (emailAlreadyRegistered) throw { type: "conflict", details: "email" };

    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    await authRepository.create(newUserData);
}

async function logUserIn(userData: UserData) {
    const user = await authRepository.getByEmail(userData.email);
    if (!user) throw { type: "not found", details: "email" };

    const passwordIsWrong = !bcrypt.compareSync(userData.password, user.password);
    if (passwordIsWrong) throw { type: "unauthorized" };

    delete user.password;

    const oneWeek = 60 * 60 * 24 * 7;
    const config = { expiresIn: oneWeek }
    const token = jwt.sign(user, process.env.JWT_SECRET, config);
    return token;
}

export const authService = {
    createNewUser,
    logUserIn
};