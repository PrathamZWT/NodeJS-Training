import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  createNewCategories,
  getAllCategories,
} from "../controller/categories.controller.js";
import { fileUploadFilter } from "../middleware/imageUploader.js";

const router = express.Router();
router.post("/", authorizeRole("admin"), fileUploadFilter, createNewCategories);
router.get("/", getAllCategories);

export default router;
