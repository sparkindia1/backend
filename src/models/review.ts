import { model, Schema } from 'mongoose';
import { Review } from './types';

export const reviewSchema = new Schema<Review>(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const ReviewModel = model<Review>('Review', reviewSchema);
