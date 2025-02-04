import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { fileUploadFilter } from "../middleware/imageUploader.js";
import {
  addNewProduct,
  getAllProducts,
  getProductDetail,
} from "../controller/products.controller.js";

const router = express.Router();

router.post("/", authorizeRole("admin"), fileUploadFilter, addNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductDetail);
// router.get("/profile", authorizeRole("admin", "customer"), getUserProfile);
// router.put("/profile", authorizeRole("admin", "customer"), updateUserProfile);
// router.get("/", authorizeRole("admin"), getAllUsers);
export default router;
