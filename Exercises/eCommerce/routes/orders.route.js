import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  getOrderDetails,
  getOrderHistory,
  placeOrder,
  updateOrderStatus,
} from "../controller/orders.controller.js";

const router = express.Router();

router.post("/", authorizeRole("customer"), placeOrder);
router.get("/", authorizeRole("customer"), getOrderHistory);
router.get("/:id", authorizeRole("customer"), getOrderDetails);
router.put("/:id/status", authorizeRole("admin"), updateOrderStatus);

export default router;
