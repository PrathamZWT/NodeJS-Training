import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let key = process.env.JWT_SECRET_KEY;
console.log(key);

export const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const jwttoken = token.split(" ")[1];
    jwt.verify(jwttoken, key, (err, decoded) => {
      if (err) {
        res.status(404).json({ message: "user is not authorized" });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
