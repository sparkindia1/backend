import { z } from 'zod';
import { validate } from '../utils/validate';

export const MIN_RATING = 0;
export const MAX_RATING = 5;

export const ValidateCreateReview = validate(
  z.object({
    productId: z.number(),
    userId: z.number(),
    rating: z.number().min(MIN_RATING).max(MAX_RATING),
    comment: z.string().optional(),
  })
);

export const validateGetReviews = validate(
  z.object({
    productId: z.number(),
  })
);

export const validateDeleteReview = validate(
  z.object({
    reviewId: z.number(),
  })
);

export const validateUpdateReview = validate(
  z.object({
    reviewId: z.number(),
    rating: z.number().min(MIN_RATING).max(MAX_RATING),
    comment: z.string().optional(),
  })
);
