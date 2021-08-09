import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getInstance().getAll);

router.get("/count", UserController.getInstance().getNumRecord);

export const userRouter = router;