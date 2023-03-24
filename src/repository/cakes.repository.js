import { connection } from "../database/db.js"
import RepositoryResponse from "./response.js"

export async function createCake(body){
    const resp = new RepositoryResponse
    const {name, price, image, description} = body

    try {
        await connection.query(`
        INSERT INTO cakes
        (name, price, image, description)
        VALUES
        ($1, $2, $3, $4)`, 
        [name, price, image, description])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}

export async function checkIfExist(cakeName){
    const resp = new RepositoryResponse

    try {
        const query = await connection.query(`
        SELECT name FROM cakes 
        WHERE LOWER(name) = LOWER($1)`,
        [cakeName])

        resp.condition = query.rowCount > 0
        resp.errCode = 409
        resp.errMessage = "This cake already exists"
        return resp.byCondition();
  
    } catch(err){return resp.direct(500, err.message)}
}