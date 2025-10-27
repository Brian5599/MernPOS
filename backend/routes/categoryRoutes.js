import express from "express";
import { authenticate, admin } from "../middlewares/authoriseMidware.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoriesById,
} from "../controller/categoryController.js";
const router = express.Router();

router.route("/").post(authenticate, admin, createCategory);
router.route("/:id").put(authenticate, admin, updateCategory);
router.route("/:id").delete(authenticate, admin, deleteCategory);
router.route("/categories").get(authenticate, getCategories);
router.route("/:id").get(authenticate, admin, getCategoriesById);
export default router;
