import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { fileUploadFilter } from "../middleware/imageUploader.js";
import {
  addNewProduct,
  DeleteProduct,
  getAllProducts,
  getProductDetail,
  updateProduct,
} from "../controller/products.controller.js";

const router = express.Router();

router.post("/", authorizeRole("admin"), fileUploadFilter, addNewProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductDetail);
router.post("/:id", authorizeRole("admin"), fileUploadFilter, updateProduct);
router.delete("/:id", authorizeRole("admin"), DeleteProduct);
// router.get("/profile", authorizeRole("admin", "customer"), getUserProfile);
// router.put("/profile", authorizeRole("admin", "customer"), updateUserProfile);
// router.get("/", authorizeRole("admin"), getAllUsers);
export default router;
