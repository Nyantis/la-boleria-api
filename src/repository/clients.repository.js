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
