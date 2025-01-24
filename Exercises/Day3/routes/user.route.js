import express from "express";
import { addUser, deleteUser, getUserById, getUsers, home, updateUser } from "../controllers/user.controller.js";
import { idMiddleWare } from "../middlewares/idMiddleware.js";
const router = express.Router();

// Task 1
router.get('/', home);

// Task 2
router.get('/users', getUsers );
router.get('/users/:id',idMiddleWare,getUserById );
router.post('/users/',addUser );
router.patch('/users/:id',idMiddleWare,updateUser );
router.delete('/users/:id',idMiddleWare,deleteUser );


export default router;