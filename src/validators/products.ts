import { z } from 'zod';
import { validate } from '../utils/validate';

export const OTP_DIGIT_LENGTH = 6;

const typeOfLevelLimit = z.string().min(3).max(500).optional().nullable();
const typeofPricePerLevel = z.number().positive().optional().nullable();

const createProductSchema = z.object({
  name: z.string().min(3).max(50),
  owner: z.number().positive(),
  description: z.string().min(3).max(500),
  imageUrl: z.string().min(3).max(500),
  stock: z.number().positive(),
  categoryId: z.number().positive(),
  levelOneLimit: typeOfLevelLimit,
  pricePerProductLevelOne: typeofPricePerLevel,
  levelTwoLimit: typeOfLevelLimit,
  pricePerProductLevelTwo: typeofPricePerLevel,
  levelThreeLimit: typeOfLevelLimit,
  pricePerProductLevelThree: typeofPricePerLevel,
  levelFourLimit: typeOfLevelLimit,
  pricePerProductLevelFour: typeofPricePerLevel,
  levelFiveLimit: typeOfLevelLimit,
  pricePerProductLevelFive: typeofPricePerLevel,
});

export const validateCreateProduct = validate(createProductSchema);

export const validateEditProduct = validate(
  createProductSchema.extend({
    productId: z.number().positive(),
  })
);

export const validateGetSingleProduct = validate(
  z.object({
    productId: z.number().positive(),
  })
);

export const validateSearchProducts = validate(
  z.object({
    category: z.string().min(3).max(50).optional().nullable(),
    name: z.string().min(3).max(50).optional().nullable(),
  })
);

export const validateInitDeleteProduct = validate(
  z.object({
    productId: z.number().positive(),
  })
);

export const validateConfirmDeleteProduct = validate(
  z.object({
    productId: z.number().positive(),
    otp: z.string().min(OTP_DIGIT_LENGTH).max(OTP_DIGIT_LENGTH),
  })
);

export const validateCancelDeleteProduct = validate(
  z.object({
    productId: z.number().positive(),
  })
);
