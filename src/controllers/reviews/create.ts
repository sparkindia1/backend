import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import filterResponse from '../../utils/filterResponse';

export const createReview = async (req: Request, res: Response) => {
  const { productId, userId, rating, comment } = req.body;
  const review = await prisma.review.create({
    data: {
      productId,
      userId,
      rating,
      comment,
    },
    select: {
      id: true,
      productId: true,
      userId: true,
      rating: true,
      comment: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    review: filterResponse(review),
    message: 'Review added successfully',
  });
};
