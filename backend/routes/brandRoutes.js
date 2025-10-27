import express from "express";
import { authenticate, admin } from "../middlewares/authoriseMidware.js";
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrand,
  getBrandById,
} from "../controller/brandController.js";
const router = express.Router();

router.route("/").post(authenticate, admin, createBrand);
router.route("/:id").put(authenticate, admin, updateBrand);
router.route("/:id").delete(authenticate, admin, deleteBrand);
router.route("/brands").get(authenticate, getAllBrand);
router.route("/:id").get(authenticate, admin, getBrandById);
export default router;
