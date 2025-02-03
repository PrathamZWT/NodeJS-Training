import express from "express";
import {
  addUser,
  //   addUserForm,
  addUserProfile,
  deleteUser,
  deleteUserImage,
  deleteUserProfile,
  //   deleteUserProfile,
  getUserById,
  getUserProfileById,
  getUsers,
  home,
  login,
  signUp,
  updateUser,
  updateUserprofile,
  uploadImage,
} from "../controllers/user.controller.js";
import { idMiddleWare } from "../middlewares/idMiddleware.js";
import { fileUploadFilter } from "../middlewares/imageUploader.js";
import { idProfileMiddleWare } from "../middlewares/idProfileMiddleware.js";
import { authentication } from "../middlewares/authentication.js";
// import { pdfUploadFilter } from "../middlewares/formUploader.js";
const router = express.Router();

// root
router.get("/", home);

// // Tusers
router.get("/users", authentication, getUsers);
router.get("/users/:id", authentication, idMiddleWare, getUserById);
router.post("/users/", authentication, addUser);
router.post("/signUp/", signUp);
router.get("/login", login);
router.patch("/users/:id", authentication, idMiddleWare, updateUser);
router.delete("/users/:id", authentication, idMiddleWare, deleteUser);

//  upload-image
router.post("/upload-image", authentication, fileUploadFilter, uploadImage);
router.delete(
  "/upload-image/:userId",
  authentication,
  idMiddleWare,
  deleteUserImage
);

// // user-profile
router.post("/user-profile", authentication, addUserProfile);
router.get(
  "/user-profile/:id",
  authentication,
  idProfileMiddleWare,
  getUserProfileById
);
router.get("/user-profile/", authentication, getUserProfileById);
router.put(
  "/user-profile/:id",
  authentication,
  idProfileMiddleWare,
  updateUserprofile
);
router.delete(
  "/user-profile/:id",
  authentication,
  idProfileMiddleWare,
  deleteUserProfile
);

// router.post("/user-form", pdfUploadFilter, addUserForm);
export default router;
