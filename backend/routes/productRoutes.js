import express from "express";
import formidable from "express-formidable";
import {
  authenticate,
  admin,
  protect,
} from "../middlewares/authoriseMidware.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
  fetchProducts,
  getNewProducts,
  getTopProducts,
  getFilteredProducts,
  addProductReviews,
} from "../controller/productController.js";
import checkId from "../middlewares/checkId.js";
const router = express.Router();

router
  .route("/")
  .post(authenticate, admin, formidable(), createProduct)
  .get(fetchProducts);
router.route("/allproducts").get(getAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReviews);

router.get("/new", getNewProducts);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .put(authenticate, admin, formidable(), updateProduct)
  .delete(authenticate, admin, deleteProduct)
  .get(getProductById);

router.route("/filteredproducts").post(getFilteredProducts);
export default router;
