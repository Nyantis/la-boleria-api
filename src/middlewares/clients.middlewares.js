import { clientSchema } from "../models/Client.js";
import { schemaValidation } from "./generics.js";

export async function clientPostMiddleware(req, res, next) {
    const client = req.body;

    {const { code, message } = schemaValidation(clientSchema, client, 400)
    if(code){return res.status(code).send(message)}}
    
    next();
}