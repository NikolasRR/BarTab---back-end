import Joi from "joi";

export const participantsSchema = Joi.array().items(
    Joi.object({
        name: Joi.string().min(3).required()
    })
);
