import { Request, Response } from 'express';

import { ReviewModel } from '../../models/review';
import filterResponse from '../../utils/filterResponse';

export const updateReview = async (req: Request, res: Response) => {
  const { reviewId, rating, comment } = req.body;
  const review = await ReviewModel.findByIdAndUpdate(reviewId, {
    rating: rating,
    comment: comment,
  });

  return res.status(200).json({
    review: filterResponse(review),
    message: 'Review updated successfully',
  });
};
