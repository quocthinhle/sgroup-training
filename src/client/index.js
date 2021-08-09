/* eslint-disable linebreak-style */
import { Router } from "express";
import { homePageRouter } from "./private";

const router = Router();
router.use("/", homePageRouter);

// eslint-disable-next-line import/prefer-default-export
export const clientRouter = router;
