import { connection } from "../database/db.js"
import RepositoryResponse from "./response.js"

export async function createCake(_body){
    const resp = new RepositoryResponse
    const {name, price, image, description} = _body

    try {
        await connection.query(`
        INSERT INTO
          cakes (name, price, image, description)
        VALUES
          ($1, $2, $3, $4)`, 
        [name, price, image, description])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


////////////////////////////////////////////////////////


export async function deleteUrl(_id){
    const resp = new RepositoryResponse

    try {
        await connection.query(`
        DELETE FROM links WHERE id = $1`, 
        [_id])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


////////////////////////////////////////////////////////


export async function accessUrl(shortUrl){
    const resp = new RepositoryResponse

    try {
        const links = await connection.query(`
          UPDATE links
          SET views = views + 1
          WHERE "shortUrl" = $1
          RETURNING url`,
          [shortUrl]
        );
        
        resp.condition = links.rowCount === 0
        resp.errCode = 404
        resp.errMessage = "This link doesn't exists"
        resp.info = links.rows[0]
        return resp.byCondition();
  
    } catch(err){return resp.direct(500, err.message)}
}


////////////////////////////////////////////////////////


export async function checkIfExist(cakeName){
    const resp = new RepositoryResponse
    console.log(cakeName)
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