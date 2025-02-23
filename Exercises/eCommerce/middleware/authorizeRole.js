import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const jwttoken = token.split(" ")[1];
      const decoded = jwt.verify(jwttoken, process.env.JWT_SECRET_KEY);

      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Forbidden: You cannot access this request with your role ",
        });
      } else {
        next();
      }
    } catch (error) {
      return res.redirect("/sign-in").status(403).json({
        message: "Epired Token or Invalid Token",
      });
    }
  };
};
