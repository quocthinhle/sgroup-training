import { Router } from "express";
import { UserController } from "./user.controller";
import { AuthController } from "../auth/auth.controller";


const router = Router();

router.get("/", AuthController.getInstance().authorization, UserController.getInstance().getAll);

router.get("/count", AuthController.getInstance().authorization, UserController.getInstance().getNumRecord);

export const userRouter = router;