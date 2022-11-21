import { Router } from 'express';

import { login } from '../controllers/users/login';
import { register, verifyAccount } from '../controllers/users/register';
import { getUser } from '../controllers/users/getUser';
import { makeSafe } from '../utils/routes';
import {
  validateForgotPassword,
  validateGetuser,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateVerifyAccount,
} from '../validators/users';
import {
  forgotPassword,
  resetPassword,
} from '../controllers/users/forgot-password';

const userRouter = Router();

userRouter.post('/', validateGetuser, makeSafe(getUser));
userRouter.post('/login', validateLogin, makeSafe(login));
userRouter.post(
  '/register/create-account',
  validateRegister,
  makeSafe(register)
);
userRouter.post(
  '/register/verify-account',
  validateVerifyAccount,
  makeSafe(verifyAccount)
);
userRouter.post(
  '/forgot-password',
  validateForgotPassword,
  makeSafe(forgotPassword)
);
userRouter.post(
  '/reset-password',
  validateResetPassword,
  makeSafe(resetPassword)
);

export default userRouter;
