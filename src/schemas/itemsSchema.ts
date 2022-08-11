import Joi from "joi";

export const itemsSchema = Joi.array().items(
    Joi.object({
        name: Joi.string().min(3).required(),
        amount: Joi.number().min(1).required(),
        value: Joi.number().required(),
        participants: Joi.array().items(
            Joi.object({
                id: Joi.number().required()
            })
        )
    })
);
