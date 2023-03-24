import { createClient, searchClient } from "../repository/clients.repository.js";

export async function create(req, res){
    let client = req.body

    {const { code, message } = await createClient(client)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(201)
}


export async function search(req, res){
    const { id } = res.locals

    const { code, message, info } = await searchClient(id)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}