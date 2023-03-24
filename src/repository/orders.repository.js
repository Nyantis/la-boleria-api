import { connection } from "../database/db.js"
import RepositoryResponse from "./response.js"

export async function createOrder(body, totalPrice){
    const resp = new RepositoryResponse
    const {clientId, cakeId, quantity} = body

    try {
        await connection.query(`
        INSERT INTO
          orders ("clientId", "cakeId", quantity, "totalPrice")
        VALUES
          ($1, $2, $3, $4)`, 
        [clientId, cakeId, quantity, totalPrice])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


export async function checkIds(cakeId, clientId){
    const resp = new RepositoryResponse

    try {
        const query = await connection.query(`
        SELECT 
        clients.id AS "clientId",
        cakes.id AS "cakeId",
        cakes.price AS price
        FROM clients JOIN cakes
        ON cakes.id = $1
        WHERE clients.id = $2`,
        [cakeId, clientId]);
        
        resp.condition = query.rowCount === 0
        resp.errCode = 404
        resp.errMessage = "client/cake doesn't exist"
        resp.info = query.rows[0]
        return resp.byCondition()
  
    } catch(err){return resp.direct(500, err.message)}
}