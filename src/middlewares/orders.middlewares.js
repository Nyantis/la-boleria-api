import { orderSchema } from "../models/Order.js";
import { checkIds } from "../repository/orders.repository.js";
import { schemaValidation } from "./generics.js";

export async function orderPostMiddleware(req, res, next) {
    const order = req.body;

    {const { code, message } = schemaValidation(orderSchema, order)
    if(code){return res.status(code).send(message)}}
    
    const { code, message, info } = await checkIds(order.cakeId, order.clientId)
    if(code){return res.status(code).send(message)}

    res.locals.totalPrice = info.price * order.quantity

    next();
}