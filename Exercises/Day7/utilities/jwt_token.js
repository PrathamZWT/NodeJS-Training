import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let key = process.env.JWT_SECRET_KEY;
// let key = "pratham";
console.log(key);

export const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, key, { expiresIn: "1h" });
  console.log(token);
  return token;
};
