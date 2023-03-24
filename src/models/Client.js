import joi from "joi";

export const clientSchema = joi.object({
    name: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required().min(10).max(11).custom((value, helpers) =>{

        const validation = /^\d+$/.test(value);

        if(!validation){
            return helpers.error("any.invalid");
        }

        return value;
    }),
});




