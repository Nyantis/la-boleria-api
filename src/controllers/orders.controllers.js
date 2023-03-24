import { createOrder, searchOrder } from "../repository/orders.repository.js";

export async function create(req, res){
    const client = req.body
    const { totalPrice } = res.locals

    {const { code, message } = await createOrder(client, totalPrice)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(201)
}


export async function search(req, res){
    const { date } = req.query
    const { id } = res.locals
    const value = id ? id : date
    const hasId = id !== null
    
    const { code, message, info } = await searchOrder(hasId, value)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}

