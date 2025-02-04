import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controller/users.controller.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = express.Router();

router.get("/profile", authorizeRole("admin", "customer"), getUserProfile);
router.put("/profile", authorizeRole("admin", "customer"), updateUserProfile);
router.get("/", authorizeRole("admin"), getAllUsers);
export default router;
