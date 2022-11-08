import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import filterResponse from '../../utils/filterResponse';

export const updateReview = async (req: Request, res: Response) => {
  const { reviewId, rating, comment } = req.body;
  const review = await prisma.review.update({
    where: {
      id: Number(reviewId),
    },
    data: {
      rating,
      comment,
    },
    select: {
      id: true,
      userId: true,
      comment: true,
      rating: true,
      productId: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    review: filterResponse(review),
    message: 'Review updated successfully',
  });
};
