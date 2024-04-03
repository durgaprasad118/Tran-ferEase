import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getBalance, transferFunds } from "../controllers/Account/index.js";
const router = Router();
router.route("/balance").get(authMiddleware, getBalance);
router.route("/transfer").post(authMiddleware, transferFunds);
export default router;
