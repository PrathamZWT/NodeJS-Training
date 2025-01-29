import users from "../../../constant.js";
import { userProfileExistsDB } from "../models/userProfile.model.js";

export const idProfileMiddleWare = async (req, res, next) => {
  try {
    let user = await userProfileExistsDB(req.params.id);
    console.log(user);
    if (user == 1) {
      next();
    } else {
      res.send("no such userProfile found");
    }
  } catch (error) {
    console.log(error);
  }
};
