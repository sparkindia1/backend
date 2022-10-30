import { z } from 'zod';
import { validate } from '../utils/validate';

export const validateGetuser = validate(
  z.object({
    id: z.string(),
  }),
  'params'
);

export const validateLogin = validate(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
);

export const validateRegister = validate(
  z.object({
    email: z.string().email(),
    phone: z.string().min(6),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'BUYER', 'SELLER']),
  })
);

export const validateVerifyAccount = validate(
  z.object({
    email: z.string().email(),
    otp: z.string().min(6),
  })
);

export const validateForgotPassword = validate(
  z.object({
    email: z.string().email(),
  })
);

export const validateResetPassword = validate(
  z.object({
    userId: z.string(),
    otp: z.string().min(6),
    password: z.string().min(6),
  })
);
