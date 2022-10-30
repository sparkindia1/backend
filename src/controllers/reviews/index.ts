import { Request, Response } from 'express';
import filterResponse from '../../utils/filterResponse';
import { prisma } from '../../utils/prisma';

export const createReview = async (req: Request, res: Response) => {
  const { productId, userId, rating, comment } = req.body;
  const review = await prisma.review.create({
    data: {
      productId,
      userId,
      rating,
      comment,
    },
  });

  return res.status(200).json({
    review: filterResponse(review),
    message: 'Review added successfully',
  });
};

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
  });

  return res.status(200).json({
    review: filterResponse(review),
    message: 'Review updated successfully',
  });
};
