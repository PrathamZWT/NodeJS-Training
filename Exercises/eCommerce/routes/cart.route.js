import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  addProductToCart,
  getCartItems,
  removeItemFromCart,
  updateProductToCart,
} from "../controller/cart.controller.js";

const router = express.Router();
router.post("/", authorizeRole("customer"), addProductToCart);
router.post("/update", authorizeRole("customer"), updateProductToCart);
router.get("/", authorizeRole("customer"), getCartItems);
router.delete("/:id", authorizeRole("customer"), removeItemFromCart);

export default router;
