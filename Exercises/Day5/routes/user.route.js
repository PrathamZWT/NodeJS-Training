import express from "express";
import { addUser, addUserProfile, deleteUser, deleteUserImage, deleteUserProfile, getUserById, getUserProfileById, getUsers, home, updateUser, updateUserprofile, uploadImage } from "../controllers/user.controller.js";
import { idMiddleWare } from "../middlewares/idMiddleware.js";
import { fileUploadFilter } from "../middlewares/imageUploader.js";
import { idProfileMiddleWare } from "../middlewares/idProfileMiddleware.js";
const router = express.Router();

// Task 1
router.get('/', home);

// Task 2
router.get('/users', getUsers );
router.get('/users/:id',idMiddleWare,getUserById );
router.post('/users/',addUser );
router.patch('/users/:id',idMiddleWare,updateUser );
router.delete('/users/:id',idMiddleWare,deleteUser );
router.post('/upload-image' , fileUploadFilter , uploadImage);


router.post('/user-profile',addUserProfile );
router.get('/user-profile/:id',idProfileMiddleWare,getUserProfileById );
router.get('/user-profile/',getUserProfileById );
router.put('/user-profile/:id',idProfileMiddleWare,updateUserprofile );
router.delete('/user-profile/:id',idProfileMiddleWare,deleteUserProfile );
router.delete('/upload-image/:userId',idMiddleWare,deleteUserImage );


export default router;