// import users from "../../../constant.js";
// import fs from "fs";
// import { validateAge } from "../validators/ageValidator.js";
// import { validateEmail } from "../validators/emailValidator.js";
// import { validateIsActive } from "../validators/isActiveValidator.js";
// import { validateRole } from "../validators/roleValidator.js";
// import { validateName } from "../validators/nameValidator.js";
// import { ifError } from "assert";

import { addFormDB } from "../models/form.model.js";
import { addUserImageDB, deleteImageDB } from "../models/user.images.model.js";
import {
  addUserDB,
  deleteUserDB,
  getUsersDB,
  updateUserDB,
  userExistsDB,
} from "../models/user.model.js";
import {
  addUserProfileDB,
  deleteUserProfileDB,
  getUsersProfileDB,
  updateUserProfileDB,
  userIdExistsDB,
  userProfileExistsDB,
} from "../models/userProfile.model.js";
import {
  CreateformSchema,
  createUserProfileSchema,
  createUserProfileUpdateSchema,
  CreateUserSchema,
  UpdateUserSchema,
} from "../validators/yupValidators.js";

// Home root api function
export const home = (req, res) => {
  res.status(200).json({ message: "Welcome to the User Management API!" });
};

//<------------------------------------------------------users Table funcrions------------------------------------------------------>//

// get data from user table

export const getUsers = async (req, res) => {
  try {
    let users = await getUsersDB();
    if (users) {
      await CreateUserSchema.validate(req.query, {
        abortEarly: false,
      });
      let role = req?.query?.role;
      let isActive = req?.query?.isActive;
      let ageGT = req?.query?.ageGT;
      let ageLT = req?.query?.ageLT;
      let filteredArray = users;
      if (role) {
        filteredArray = filteredArray.filter((user) => user.role == role);
      } else {
        return res.status(404).json({ message: "invaild entry" });
      }
      if (isActive) {
        filteredArray = filteredArray.filter(
          (user) => String(user.isActive) == isActive
        );
      }
      if (ageGT) {
        filteredArray = filteredArray.filter((user) => user.age > ageGT);
      }
      if (ageLT) {
        filteredArray = filteredArray.filter((user) => user.age < ageLT);
      }
      return res.status(200).json({ Users: filteredArray });
    } else {
      res.status(404).json({ message: "No users found !" });
    }
    let allUserName = users.map((user) => user.name).Yupn("<br>");
    res.send(allUserName);
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
    return res.status(200).json({ userData: await getUsersDB(uID) });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.errors,
    });
  }
};

// add user in users table
export const addUser = async (req, res) => {
  try {
    await CreateUserSchema.validate(req.body, {
      abortEarly: false,
    });

    const { name, email, age, role, isActive } = req?.body;
    let added = await addUserDB(name, email, age, role, isActive);
    if (added) {
      res.status(200).json({ message: "user added succesfully" });
    } else {
      res.status(404).json({ message: "user was not added" });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.errors,
    });
  }
};
//   update user from users table
export const updateUser = async (req, res) => {
  try {
    let uID = req.params.id;
    await UpdateUserSchema.validate(req.body, {
      abortEarly: false,
    });
    let updated = await updateUserDB(req.body, uID);
    if (updated) {
      return res.status(200).json({
        message: "User updated succesfully",
      });
    } else {
      return res.status(404).json({
        message: "User was not updated",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.errors,
    });
  }
};

// delete user from user table
export const deleteUser = async (req, res) => {
  let uID = Number(req.params.id);
  try {
    let result = await deleteUserDB(uID);
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
    let userexists = await userExistsDB(req.body.id);
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
    return res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      if (!(await userIdExistsDB(userId))) {
        if (await userExistsDB(userId)) {
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
      } else {
        res
          .status(404)
          .json({ message: "userProfile with same userId already exists" });
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
    return res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      if (await userProfileExistsDB(userId)) {
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

export const addUserForm = async (req, res) => {
  try {
    await CreateformSchema.validate(req.body, {
      abortEarly: false,
    });
    const { name, email, age, role, isActive } = req?.body;
    let added = await addFormDB(name, email, age, role, isActive, req.file);
    if (added) {
      res.status(200).json({ message: "form added succesfully" });
    } else {
      res.status(404).json({ message: "form was not added" });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.errors,
    });
  }
};
