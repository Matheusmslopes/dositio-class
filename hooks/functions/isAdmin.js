import { NOT_ADMIN } from "../../libs/error.js";

export const isAdmin = (app) => async(req, rep) => {
    const user = app.mongo.db.collection('users');

    try{
        const checkAdm = await user.findOne({jwtToken: req.headers['x-access-token']})
        if (checkAdm.isAdmin){
            return
        }
        else{
            throw new NOT_ADMIN();
        }
    }catch(error){
        req.log.error(error);
        throw new NOT_ADMIN();
    }
}