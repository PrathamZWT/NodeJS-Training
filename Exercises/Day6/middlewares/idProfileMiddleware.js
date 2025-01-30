import users from "../../../constant.js";
import UserProfiles from "../models/userProfile.model.js";

export const idProfileMiddleWare = async (req, res, next) => {
  try {
    let user = await UserProfiles.findByPk(req.params.id);
    console.log(user);
    if (user === null) {
      res.send("no such userProfile found");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
