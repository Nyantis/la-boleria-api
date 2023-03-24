import { cakeSchema } from "../models/Cake.js";
import { schemaValidation } from "./generics.js";
import { checkIfExist } from "../repository/cakes.repository.js";

export async function simplePostMiddleware(req, res, next) {
    const cake = req.body;

    {const { code, message } = schemaValidation(
    cakeSchema, cake, 400,
    {field:"image", code:422})
    if(code){return res.status(code).send(message)}}
    
    {const { code, message } = await checkIfExist(cake.name)
    console.log(code+", "+message)
    if(code){return res.status(code).send(message)}}

    next();
}