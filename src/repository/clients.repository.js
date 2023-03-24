import { connection } from "../database/db.js";
import RepositoryResponse from "./response.js";


export async function createClient(client){
    const resp = new RepositoryResponse
    const {name, address, phone} = client

    try {
        await connection.query(`
            INSERT INTO clients (name, address, phone) 
            VALUES ($1, $2, $3)`, 
            [name, address, phone])

        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
}



export async function searchClient(clientId){
    const resp = new RepositoryResponse

    try {
        const query = await connection.query(`
        SELECT 

        ord.id AS "orderId",
        quantity,
        "createdAt",
        "totalPrice",
        cak.name AS "cakeName"
        
        FROM orders ord
        JOIN cakes cak ON cak.id = ord."cakeId" 
        WHERE "clientId" = $1`, 
        [clientId])
        
        resp.condition = query.rowCount === 0
        resp.errCode = 404
        resp.errMessage = "There are no orders or this client doesnt exist"
        resp.info = query.rows
        return resp.byCondition()

    } catch(err){return resp.direct(500, err.message)}
}