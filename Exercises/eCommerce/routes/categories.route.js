import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  createNewCategories,
  getAllCategories,
} from "../controller/categories.controller.js";

const router = express.Router();
router.post("/", authorizeRole("admin"), createNewCategories);
router.get("/", getAllCategories);

export default router;
