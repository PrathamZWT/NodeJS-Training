import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let key = process.env.JWT_SECRET_KEY;
// let key = "pratham";
console.log(key);

export const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, key, { expiresIn: "1h" });
  console.log(token);
  return token;
};
