import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.body;
  await prisma.review.delete({
    where: {
      id: Number(reviewId),
    },
  });
  return res.status(200).json({
    message: 'Review deleted successfully',
  });
};
