import { Types } from 'mongoose';
import { Request, Response } from 'express';

import { ReviewModel } from '../../models/review';
import filterResponse from '../../utils/filterResponse';

export const getReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const reviews = await ReviewModel.find({
    product: new Types.ObjectId(productId),
  });

  return res.status(200).json({
    reviews: filterResponse(reviews),
    message: 'Successful',
  });
};
