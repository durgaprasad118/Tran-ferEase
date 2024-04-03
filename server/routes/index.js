import { Router } from "express";
const router = Router();
import userRouter from "./user.Routes.js";
import accountRouter from "./account.routes.js";
router.use("/user", userRouter);
router.use("/account", accountRouter);
export default router;
