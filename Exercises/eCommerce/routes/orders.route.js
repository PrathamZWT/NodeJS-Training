import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import {
  getallOrderHistory,
  getOrderDetails,
  getOrderHistory,
  placeOrder,
  updateOrderStatus,
} from "../controller/orders.controller.js";

const router = express.Router();

router.post("/", authorizeRole("customer"), placeOrder);
router.get("/", authorizeRole("customer"), getOrderHistory);
router.get("/admin", authorizeRole("admin"), getallOrderHistory);
router.get("/:id", authorizeRole("customer"), getOrderDetails);
router.put("/:id/status", authorizeRole("admin"), updateOrderStatus);

export default router;
