import { createOrder } from "../repository/orders.repository.js";

export async function create(req, res){
    const client = req.body
    const { totalPrice } = res.locals
    console.log(totalPrice)

    {const { code, message } = await createOrder(client, totalPrice)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(201)
}

// export async function login(req, res){
//     const session = {
//     token: uuidv4(),
//     userId: res.locals.id,
//     createdAt: Date.now(),}

//     {const { code, message } = await loginUser(session)
//     if(code){return res.status(code).send(message)}}

//     return res.status(200).send({token: session.token})
// }

// export async function profile(req, res){
//     const { userId } = res.locals

//     const { code, message, info } = await getUser(userId)
//     if(code){return res.status(code).send(message)}

//     return res.status(200).send(info)
// }

// export async function rank(req, res){
//     const { limit = 10 } = req.params

//     const { code, message} = await getRank(limit)
//     if(code){return res.status(code).send(message)}

//     return res.status(code).send(message)
// }