import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import { placeOrder } from "../controller/orders.controller.js";

const router = express.Router();

router.post("/", authorizeRole("customer"), placeOrder);
// router.get("/", authorizeRole("customer"), getOrderHistory);
// router.get("/:id", authorizeRole("customer"), getOrderDetails);
// router.put("/:id", authorizeRole("admin"), updateOrderStatus);

export default router;
