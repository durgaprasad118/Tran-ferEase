import { Router } from "express";

import {
  LoginUser,
  RegisterUser,
  updateUser,
  userList,
  getUserDetails,
} from "../controllers/user/index.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();
router.route("/signup").post(RegisterUser);
router.route("/signin").post(LoginUser);
router.route("/update").put(authMiddleware, updateUser);
router.route("/bulk").get(authMiddleware, userList);
router.route("/details").get(authMiddleware, getUserDetails);
export default router;
