import { createCake } from "../repository/cakes.repository.js"


export async function create(req, res){
    const { code, message } = await createCake(req.body)
    if(code){return res.status(code).send(message)}

    return res.sendStatus(201)
}
