import Users from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema } from "../validators/registerSchema.js";
import { generateToken } from "../utilities/jwt_token.js";
import { loginSchema } from "../validators/loginSchema.js";

// Register api controller  (/api/auth/register)
export const register = async (req, res) => {
  try {
    await registerSchema.validate(req.body, {
      abortEarly: false,
    });
    const { first_name, last_name, email, password, role } = req.body;
    try {
      let emailExists = await Users.findOne({ where: { email } });
      if (emailExists) {
        return res.status(409).json({ message: "email is already registered" });
      }
      await Users.create({ first_name, last_name, email, password, role });
      res.status(201).json("user created successfully");
    } catch (error) {
      res.status(400).json({ message: "user was not created.", error });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

// Login api controller  (/api/auth/login)
export const login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, {
      abortEarly: false,
    });

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }
    const validateUser = await Users.findOne({
      where: { email },
    });
    if (!validateUser) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const validatePassword = bcrypt.compareSync(
      password,
      validateUser.password
    );
    if (!validatePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const token = generateToken(validateUser.id, validateUser.role);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        token,
      });
  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurred. Please try again later.",
    });
  }
};
