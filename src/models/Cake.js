import joi from "joi";

export const cakeSchema = joi.object({
    image: joi.string().required().uri(),
    name: joi.string().required().min(2),
    price: joi.number().required().integer().greater(0),
    description: joi.string(),
});