import { loggerfunction } from "../utilities/loggerFunction.js";

export const logger = (req,res,next)=>{
    let date = new Date();
    loggerfunction(req , date);
    next();
}