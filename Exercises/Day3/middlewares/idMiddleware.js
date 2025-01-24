import users from "../../../constant.js";

export const idMiddleWare = (req,res,next) => {
    const user = users.find(user => user.id == req.params.id);
    if (user) {
    next();
    } else {
    res.send("no such user found");
    }
}