import RepositoryResponse from "../repository/response.js";

export function schemaValidation(schema, data, code, inCase){
    const resp = new RepositoryResponse
    const { error } = schema.validate(data, { abortEarly: false });
    
    if (error) {
        let errors = ""
        error.details.map((detail) => errors += detail.message + "\n");
        if(inCase){code = errors.includes(inCase.field) ? inCase.code : code}
        return resp.direct(code || 422, errors)
    }
    return resp.continue
}


////////////////////////////////////////////////////////////


export async function idParamSanitization(req, res, next) {
    let { id } = req.params
    id = Number.parseInt(id)
    id = isNaN(id) ? null : id

    res.locals.id = id
    
    next();
}