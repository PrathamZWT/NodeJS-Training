// // import users from "../../../constant.js";
// // import fs from "fs";
// // import { validateAge } from "../validators/ageValidator.js";
// // import { validateEmail } from "../validators/emailValidator.js";
// // import { validateIsActive } from "../validators/isActiveValidator.js";
// // import { validateRole } from "../validators/roleValidator.js";
// // import { validateName } from "../validators/nameValidator.js";
// // import { ifError } from "assert";

import User from "../models/user.model.js";
import path from "path";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
// import Sequelize from "sequelize";
// import { addFormDB } from "../models/form.model.js";
// import { addUserImageDB, deleteImageDB } from "../models/user.images.model.js";
// import {
//   addUserDB,
//   deleteUserDB,
//   getUsersDB,
//   updateUserDB,
//   userExistsDB,
// } from "../models/user.model.js";
// import {
//   addUserProfileDB,
//   deleteUserProfileDB,
//   getUsersProfileDB,
//   updateUserProfileDB,
//   userIdExistsDB,
//   userProfileExistsDB,
// } from "../models/userProfile.model.js";
import {
  CreateformSchema,
  createUserProfileSchema,
  createUserProfileUpdateSchema,
  CreateUserSchema,
  loginSchema,
  signUpSchema,
  UpdateUserSchema,
} from "../validators/yupValidators.js";
import UserImages from "../models/user.images.model.js";
import {
  addUserImageDB,
  deleteImageDB,
} from "../services/user.images.services.js";
import {
  addUserProfileDB,
  deleteUserProfileDB,
  getUsersProfileDB,
  updateUserProfileDB,
} from "../services/user.profile.services.js";
import UserProfiles from "../models/userProfile.model.js";
import { Sequelize } from "sequelize";
import { generateToken } from "../utilities/jwt_token.js";

// Home root api function
export const home = (req, res) => {
  res.status(200).json({ message: "Welcome to the User Management API!" });
};

//<------------------------------------------------------users Table funcrions------------------------------------------------------>//

// get data from user table

export const getUsers = async (req, res) => {
  try {
    let { limit = 10, page = 1 } = req.query;
    let orderBy = req?.query?.orderBy || "ASC";
    let column = req?.query?.column || "createdAt";
    let { role, isActive } = req.query;
    let ageGt = parseInt(req?.query.ageGt);
    let offset = (page - 1) * limit;
    limit = parseInt(limit);
    page = parseInt(page);
    console.log(ageGt);
    const filters = {};
    if (role) {
      filters.role = role;
    }
    if (isActive) {
      filters.isActive = isActive === "true";
    }
    if (ageGt) {
      filters.age = { [Op.gt]: ageGt };
    }
    let users = await User.findAll({
      where: filters,
      order: [[column, orderBy]],
      offset,
      limit,
    });
    // res.send(users);
    return res.status(200).json({ Users: users });
  } catch (error) {
    console.log(error);
  }
};

// gat data of id passes from user table

export const getUserById = async (req, res) => {
  const uID = req.params.id;
  if (isNaN(uID)) {
    return res
      .status(422)
      .json({ message: "Invaild Entry Unprocessable Entity" });
  }
  try {
    return res.status(200).json({
      userData: await User.findOne({
        include: [
          {
            model: UserImages,
            required: true,
          },
          {
            model: UserProfiles,
            required: true,
          },
        ],
      }),
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: error.errors,
    });
  }
};

// add user in users table
export const addUser = async (req, res) => {
  try {
    await CreateUserSchema.validate(req.body, { abortEarly: false });

    const { name, email, age, role, isActive } = req.body;

    const newUser = await User.create({
      name,
      email,
      age,
      role,
      isActive,
    });

    if (newUser) {
      return res.status(201).json({ message: "User added successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add user" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.errors || error.message });
  }
};
// signUp user in users table
export const signUp = async (req, res) => {
  try {
    await signUpSchema.validate(req.body, { abortEarly: false });

    const { name, email, age, role, isActive, password } = req.body;

    const newUser = await User.create({
      name,
      email,
      age,
      role,
      isActive,
      password,
    });

    if (newUser) {
      return res.status(201).json({ message: "User added successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add user" });
    }
  } catch (error) {
    return res.status(404).json({ error: error.errors || error.message });
  }
};

export const login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res
        .status(402)
        .json({ success: false, message: "incorrect email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(402)
        .json({ success: false, message: "incorrect email or password" });
    }

    let token = generateToken(user.id, user.email);
    console.log(user.id, user.email);
    res
      .status(200)
      .json({ success: true, message: "Login successful", token, user });
  } catch (error) {
    return res.status(404).json({ error: error.errors || error.message });
  }
};

//   update user from users table
export const updateUser = async (req, res) => {
  try {
    let uID = req.params.id;
    await UpdateUserSchema.validate(req.body, {
      abortEarly: false,
    });

    let newData = {};

    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== undefined) {
        newData[key] = value;
      }
    });

    let [updated] = await User.update(newData, {
      where: { id: uID },
    });

    if (updated) {
      let updatedUser = await User.findByPk(uID);
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

// delete user from user table
export const deleteUser = async (req, res) => {
  let uID = Number(req.params.id);
  try {
    let result = await User.destroy({
      where: {
        id: uID,
      },
    });
    if (result) {
      res.status(200).json({
        message: "User deleted succesfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "User deleted succesfully",
    });
  }
};

//<------------------------------------------------------user-images Table functions------------------------------------------------------>//

//  upload image in user-images
export const uploadImage = async (req, res) => {
  console.log(req.body);
  console.log(req.body.id);
  console.log(req.file);
  try {
    let userexists = await User.findByPk(req.body.id);
    console.log(userexists);

    if (userexists) {
      console.log(req.file);

      let imageAdded = await addUserImageDB(req.body.id, req.file);
      if (imageAdded) {
        res.status(200).json({
          message: "User image updated succesfully",
        });
      } else {
        res.status(200).json({
          message: "error occuerd in adding user image ]",
        });
      }
    } else {
      res.status(404).json({
        message: "no such user exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//  delete image from user-images

export const deleteUserImage = async (req, res) => {
  let uID = Number(req.params.userId);
  try {
    let result = await deleteImageDB(uID);
    if (result) {
      res.status(200).json({
        message: "UserProfile deleted succesfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "UserProfile was not deleted ",
    });
  }
};

//<------------------------------------------------------user-profiles Table funcrions------------------------------------------------------>//

//  add user to user-profiles

export const addUserProfile = async (req, res) => {
  console.log("hello");
  const { userId, bio, linkedInUrl, facebookUrl, instaUrl } = req?.body;
  const { error } = createUserProfileSchema.validate(req.body);

  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  } else {
    try {
      if (await UserProfiles.findOne({ where: { userId } })) {
        return res
          .status(404)
          .json({ message: "profile with same user id already exists" });
      }
      if (await User.findByPk(userId)) {
        let addedProfile = await addUserProfileDB(
          userId,
          bio,
          linkedInUrl,
          facebookUrl,
          instaUrl
        );
        if (addedProfile) {
          res.status(200).json({ message: "userProfile added succesfully" });
        } else {
          res.status(404).json({ message: "userProfile was not added" });
        }
      } else {
        res.status(404).json({ message: "no such user exists or user" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//  get user by id from user-profiles

export const getUserProfileById = async (req, res) => {
  const uID = req.params.id;
  console.log(uID);

  if (!isNaN(uID) || uID == undefined) {
    try {
      return res.status(200).json({ userData: await getUsersProfileDB(uID) });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res
      .status(422)
      .json({ message: "Invaild Entry Unprocessable Entity" });
  }
};

//  add user to user-profiles

export const updateUserprofile = async (req, res) => {
  const { bio, linkedInUrl, facebookUrl, instaUrl } = req?.body;
  const { error } = createUserProfileUpdateSchema.validate(req.body);
  let userId = req.params.id;
  console.log(userId);

  if (error) {
    return res.status(404).json({ message: error.details[0].message });
  } else {
    try {
      if (await UserProfiles.findByPk(userId)) {
        let updatedProfile = await updateUserProfileDB(req.body, userId);
        if (updatedProfile) {
          res.status(200).json({ message: "userProfile updates succesfully" });
        } else {
          res.status(404).json({ message: "userProfile was not updated" });
        }
      } else {
        res.status(404).json({ message: "no such user exists" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

//  delete user from user-profiles

export const deleteUserProfile = async (req, res) => {
  let uID = Number(req.params.id);
  try {
    let result = await deleteUserProfileDB(uID);
    if (result) {
      res.status(200).json({
        message: "UserProfile deleted succesfully",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "UserProfile deleted succesfully",
    });
  }
};

// export const addUserForm = async (req, res) => {
//   try {
//     await CreateformSchema.validate(req.body, {
//       abortEarly: false,
//     });
//     const { name, email, age, role, isActive } = req?.body;
//     let added = await addFormDB(name, email, age, role, isActive, req.file);
//     if (added) {
//       res.status(200).json({ message: "form added succesfully" });
//     } else {
//       res.status(404).json({ message: "form was not added" });
//     }
//   } catch (error) {
//     return res.status(404).json({
//       error: error.errors,
//     });
//   }
// };
