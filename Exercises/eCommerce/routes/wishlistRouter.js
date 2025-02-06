import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  addProductToWishlist,
  getWishlist,
  removeItemFromWishlist,
} from "../controller/wishlist.controller.js";

const router = express.Router();

router.post("/", authorizeRole("customer"), addProductToWishlist);
router.get("/", authorizeRole("customer"), getWishlist);
router.delete("/:id", authorizeRole("customer"), removeItemFromWishlist);
export default router;
