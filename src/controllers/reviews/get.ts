import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import filterResponse from '../../utils/filterResponse';

export const getReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const reviews = await prisma.review.findMany({
    where: {
      productId: Number(productId),
    },
  });

  return res.status(200).json({
    reviews: filterResponse(reviews),
    message: 'Successful',
  });
};
