import users from "../../../constant.js";
import { userExistsDB } from "../models/user.model.js";

export const idMiddleWare = async (req,res,next) => {
    try {    
        let user = await userExistsDB(req.params.id);
        console.log(user);
        if (user == 1) {
            next();
        } else {
            res.send("no such user found");
        }
    } catch (error) {
        console.log(error);
        
    }
}