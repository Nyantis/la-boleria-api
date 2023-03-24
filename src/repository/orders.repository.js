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


export async function searchOrder(hasId, value){
  const resp = new RepositoryResponse
  const whereString = hasId?`ord.id`:`"createdAt"::date` 

  try {
      const query = await connection.query(`
      SELECT
      ${giganticQuery}
      WHERE ${whereString} = $1`,
      [value]);
      
      let formated=[]
      query.rows.map(c =>
        formated.push({
        client: {
            id: c.clientId,
            name: c.clientName,
            address: c.address,
            phone: c.phone
            },
        cake: {
            id: c.cakeId,
            name: c.cakeName,
            price: c.price,
            description: c.description,
            image: c.image
            },
        orderId: c.orderId,
        createdAt: c.createdAt,
        quantity: c.quantity,
        totalPrice: c.totalPrice
        }))
      
      resp.condition = query.rowCount === 0
      resp.errMessage = query.rows
      resp.errCode = 404
      resp.info = formated
      return resp.byCondition()

  } catch(err){return resp.direct(500, err.message)}
}





const giganticQuery = `
      cli.id AS "clientId",
      cli.name AS "clientName",
      cli.address,
      cli.phone,
      
      cak.id AS "cakeId",
      cak.name AS "cakeName",
      cak.price,
      cak.description,
      cak.image,
      
      ord.id AS "orderId",
      date_trunc('second', "createdAt") AS "createdAt",
      ord.quantity,
      ord."totalPrice"
      
      FROM orders ord
      JOIN clients cli ON cli.id = ord."clientId"
      JOIN cakes cak ON cak.id = ord."cakeId" 
`