import express from 'express';
import { AuthController } from './auth.controller';
import { GoogleRouter } from './social-authenticator/google/google-authen.router';
import { registerValidator, loginValidator } from './validator';

const router = express.Router();

router.post('/register', registerValidator, AuthController.getInstance().register);
router.post('/login', loginValidator, AuthController.getInstance().login);
router.use('/google', GoogleRouter);

export const authRouter = router;
