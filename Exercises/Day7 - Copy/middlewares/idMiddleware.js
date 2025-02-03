import User from "../models/user.model.js";

export const idMiddleWare = async (req, res, next) => {
  try {
    let user = await User.findByPk(req.params.id || req.params.userId);
    // console.log(user);
    if (user === null) {
      res.send("no such user found");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
