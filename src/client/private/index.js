/* eslint-disable linebreak-style */
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.render("pages/dashboard.pug"));
router.get("/login", (req, res) => res.render("pages/login.pug"));
router.get("/register", (req, res) => res.render("pages/register.pug"));
router.get("/user", (req, res) => res.render("pages/table.pug"))

// eslint-disable-next-line import/prefer-default-export
export const homePageRouter = router;
