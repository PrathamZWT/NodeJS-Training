import Users from "../models/users.model.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { updateUserProfileSchema } from "../validators/updateUserProfile.js";
import { getAllUsersSchema } from "../validators/getAllUsersSchema.js";

// Get logged-in user profile----------(/api/users/profile)-----------Access[Customer, Admin]
export const getUserProfile = async (req, res) => {
  try {
    if (req.user.role === "customer") {
      const userData = await Users.findByPk(req.user.id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (userData) {
        return res.status(200).json({ user: userData });
      } else {
        return res.status(404).json({ message: "no such user found" });
      }
    }
    if (req.user.role === "admin") {
      let inputID = req.body.userid;
      if (!(inputID === undefined)) {
        const userData = await Users.findByPk(inputID, {
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });
        if (userData) {
          return res.status(200).json({ user: userData });
        } else {
          return res.status(404).json({ message: "no such user found" });
        }
      } else {
        const userData = await Users.findByPk(req.user.id, {
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        });
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
    const { first_name, last_name, email, role, password } = req.body;
    const changes = {
      ...(first_name && { first_name: first_name }),
      ...(last_name && { last_name: last_name }),
      ...(email && { email: email }),
    };
    if (password) {
      return res
        .status(403)
        .json({ message: "you cannot change the password" });
    }
    if (role) {
      return res.status(403).json({ message: "you cannot change the role" });
    }
    let [updated] = await Users.update(changes, {
      where: { id: req.user.id },
    });
    if (updated) {
      let updatedUser = await Users.findByPk(req.user.id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
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
    let role = req.query.role;
    await getAllUsersSchema.validate(
      { role },
      {
        abortEarly: false,
      }
    );

    if (role) {
      const users = await Users.findAll({
        where: { role },
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (users) {
        return res.status(200).json({ users: users });
      } else {
        res.status(404).json({ message: "no user in users table" });
      }
    } else {
      const users = await Users.findAll({
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (users) {
        return res.status(200).json({ users: users });
      } else {
        res.status(404).json({ message: "no user in users table" });
      }
    }
  } catch (error) {
    return res.status(404).json({
      error: error.errors || error.message,
    });
  }
};
