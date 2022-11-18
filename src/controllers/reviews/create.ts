import { Types } from 'mongoose';
import { Request, Response } from 'express';

import { ReviewModel } from '../../models/review';
import filterResponse from '../../utils/filterResponse';

export const createReview = async (req: Request, res: Response) => {
  const { productId, userId, rating, comment } = req.body;
  const review = await ReviewModel.create({
    user: new Types.ObjectId(userId),
    product: new Types.ObjectId(productId),
    rating,
    comment,
  });

  return res.status(200).json({
    review: filterResponse(review),
    message: 'Review added successfully',
  });
};
