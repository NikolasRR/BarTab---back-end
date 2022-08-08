import Joi from "joi";

import { UserData } from "../services/authServices.js";

export const signUpSchema = Joi.object<UserData>({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});

export const signInSchema = Joi.object<UserData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
});