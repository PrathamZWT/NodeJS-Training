import Users from "../models/users.model.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { updateUserProfileSchema } from "../validators/updateUserProfile.js";

// Get logged-in user profile----------(/api/users/profile)-----------Access[Customer, Admin]
export const getUserProfile = async (req, res) => {
  try {
    console.log(req.user);

    if (req.user.role === "user") {
      console.log("user");
      const userData = await Users.findByPk(req.user.id);
      if (userData) {
        return res.status(200).json({ user: userData });
      } else {
        return res.status(404).json({ message: "no such user found" });
      }
    }
    if (req.user.role === "admin") {
      let inputID = req.body.userid;
      if (!(inputID === undefined)) {
        console.log("admin");
        const userData = await Users.findByPk(inputID);
        if (userData) {
          return res.status(200).json({ user: userData });
        } else {
          return res.status(404).json({ message: "no such user found" });
        }
      } else {
        const userData = await Users.findByPk(req.user.id);
        res.status(200).json({ user: userData });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Put Update user profile----------(/api/users/profile)-----------Access[Customer, Admin]
export const updateUserProfile = async (req, res) => {
  try {
    await updateUserProfileSchema.validate(req.body, {
      abortEarly: false,
    });
    const { first_name, last_name, email, role } = req.body;
    console.log("hello");
    const changes = {
      ...(first_name && { first_name: first_name }),
      ...(last_name && { last_name: last_name }),
      ...(email && { email: email }),
      ...(role && { role: role }),
    };

    let [updated] = await Users.update(changes, {
      where: { id: req.user.id },
    });

    if (updated) {
      let updatedUser = await Users.findByPk(req.user.id);
      return res.status(200).json({
        message: "User updated successfully",
        userdata: updatedUser,
      });
    } else {
      return res.status(404).json({
        message: "User not found or no changes applied",
      });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    if (users) {
      return res.status(200).json({ users: users });
    } else {
      res.status(404).json({ message: "no user in users table" });
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
