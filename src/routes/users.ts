import { Router } from 'express';

import login from '../controllers/users/login';
import register from '../controllers/users/register';
import { makeSafe } from '../utils/routes';
import { validateLogin, validateRegister } from '../validators/users';

const userRouter = Router();

userRouter.post('/login', validateLogin, makeSafe(login));
userRouter.post('/register', validateRegister, makeSafe(register));
// userRouter.post('/revalidate', makeSafe());

export default userRouter;
