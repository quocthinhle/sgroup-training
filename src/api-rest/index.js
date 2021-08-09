import { Router } from "express";
import { authRouter } from "./auth/auth.router";
import { userRouter } from "./users/user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);


export const apiRouter = router;