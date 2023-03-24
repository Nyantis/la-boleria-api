import { clientSchema } from "../models/Client.js";
import { schemaValidation } from "./generics.js";

export async function clientPostMiddleware(req, res, next) {
    const client = req.body;

    {const { code, message } = schemaValidation(clientSchema, client, 400)
    if(code){return res.status(code).send(message)}}
    
    next();
}


// ///////////////////////////////////////////////////////


// export async function loginValidation(req, res, next) {
//     const user = req.body;

//     {const { code, message } = schemaValidation(loginSchema, user)
//     if(code){return res.status(code).send(message)}}
    
//     {const { code, message, info } = await checkUser(user)
//     if(code){return res.status(code).send(message)}
//     else{res.locals.id = info.id}}

//     next();
// }