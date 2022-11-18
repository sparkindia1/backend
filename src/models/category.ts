import { model, Schema } from 'mongoose';
import { Category } from './types';

export const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

export const CategoryModel = model<Category>('Category', categorySchema);
