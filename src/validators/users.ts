import { z } from 'zod';
import { validate } from '../utils/validate';

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
