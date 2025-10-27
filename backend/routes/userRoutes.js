import express from "express";
import {
  createUser,
  loginUser,
  logOutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controller/userController.js";
import { authenticate, admin } from "../middlewares/authoriseMidware.js";
const router = express.Router();

router.route("/").post(createUser).get(authenticate, admin, getAllUsers);
router.get("/getAllUsers", authenticate, admin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logOutUser);
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

//admin
router
  .route("/:id")
  .delete(authenticate, admin, deleteUserById)
  .get(authenticate, admin, getUserById)
  .put(authenticate, admin, updateUserById);
export default router;

// import express from "express";
// import { createUser,loginUser,logOutUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,getUserById,deleteUserById,updateUserById } from "../controller/userController.js";
// import { authenticate, admin } from "../middlewares/authoriseMidware.js"

// const router = express.Router();

// // Add GET route for root path to handle GET /api/users
// router.route('/').post(createUser).get(authenticate, admin, getAllUsers);

// // Keep your existing routes
// router.get('/getAllUsers', authenticate, admin, getAllUsers);
// router.post('/auth', loginUser)
// router.post('/logout',logOutUser)
// router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate,updateCurrentUserProfile)

// //admin
// router.route("/:id").delete(authenticate,admin,deleteUserById).get(authenticate,admin,getUserById).put(admin,authenticate,updateUserById)

// export default router;
