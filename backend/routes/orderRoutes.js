import express from "express";
const router = express.Router();
import {
  calculateTotalSales,
  calculateTotalSalesByDate,
  countTotalSales,
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrder,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "../controller/orderController.js";

import { authenticate, admin } from "../middlewares/authoriseMidware.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, admin, getAllOrders);
router.route("/userOrders").get(authenticate, getUserOrder);
router.route("/totalSalesCount").get(authenticate, countTotalSales);
router.route("/totalSales").get(authenticate, calculateTotalSales);
router.route("/totalSalesByDate").get(authenticate, calculateTotalSalesByDate);
router.route("/:id").get(authenticate, getOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router.route("/:id/deliver").put(authenticate, admin, markOrderAsDelivered);

export default router;
