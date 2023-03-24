import { createCake } from "../repository/cakes.repository.js"


export async function create(req, res){
    const { code, message } = await createCake(req.body)
    if(code){return res.status(code).send(message)}

    return res.sendStatus(201)
}


// //////////////////////////////////////////////////////////


// export async function access(req, res) {
//     const { shortUrl } = req.params;
    
//     const { code, message, info } = await accessUrl(shortUrl)
//     if(code){return res.status(code).send(message)}

//     return res.redirect(info.url)
// }


// //////////////////////////////////////////////////////////


// export async function getUrlInfo(req, res) {
//     const { id } = res.locals;
    
//     const { code, message, info } = await getUrl(id)
//     if(code){return res.status(code).send(message)}

//     return res.status(200).send(info)
// }


// //////////////////////////////////////////////////////////


// export async function remove(req, res) {
//     const { id, userId } = res.locals;
    
//     {const { code, message, info } = await getUrl(id, 'userId')
//     if(code){return res.status(code).send(message)}
//     if(userId !== info.userId){return res.status(401).send("You can't delete this link")}}
    
//     {const { code, message } = await deleteUrl(id)
//     if(code){return res.status(code).send(message)}}

//     return res.sendStatus(204)
// }