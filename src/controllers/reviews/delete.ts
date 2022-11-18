import { Request, Response } from 'express';

import { ReviewModel } from '../../models/review';

export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.body;
  await ReviewModel.findByIdAndDelete(reviewId);
  return res.status(200).json({
    message: 'Review deleted successfully',
  });
};
