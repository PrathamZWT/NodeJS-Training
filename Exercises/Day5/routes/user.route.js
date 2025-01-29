import express from "express";
import {
  addUser,
  addUserForm,
  addUserProfile,
  deleteUser,
  deleteUserImage,
  deleteUserProfile,
  getUserById,
  getUserProfileById,
  getUsers,
  home,
  updateUser,
  updateUserprofile,
  uploadImage,
} from "../controllers/user.controller.js";
import { idMiddleWare } from "../middlewares/idMiddleware.js";
import { fileUploadFilter } from "../middlewares/imageUploader.js";
import { idProfileMiddleWare } from "../middlewares/idProfileMiddleware.js";
import { pdfUploadFilter } from "../middlewares/formUploader.js";
const router = express.Router();

// root
router.get("/", home);

// Tusers
router.get("/users", getUsers);
router.get("/users/:id", idMiddleWare, getUserById);
router.post("/users/", addUser);
router.patch("/users/:id", idMiddleWare, updateUser);
router.delete("/users/:id", idMiddleWare, deleteUser);

//  upload-image
router.post("/upload-image", fileUploadFilter, uploadImage);
router.delete("/upload-image/:userId", idMiddleWare, deleteUserImage);

// user-profile
router.post("/user-profile", addUserProfile);
router.get("/user-profile/:id", idProfileMiddleWare, getUserProfileById);
router.get("/user-profile/", getUserProfileById);
router.put("/user-profile/:id", idProfileMiddleWare, updateUserprofile);
router.delete("/user-profile/:id", idProfileMiddleWare, deleteUserProfile);

router.post("/user-form", pdfUploadFilter, addUserForm);
export default router;
