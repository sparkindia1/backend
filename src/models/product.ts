import { model, Schema } from 'mongoose';
import { Product } from './types';

export const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: [
      {
        cost: {
          type: Number,
          required: true,
        },
        levelIndex: {
          type: Number,
          required: true,
        },
        levelLimit: {
          type: String,
          required: true,
        },
      },
    ],
    bannerImage: {
      type: String,
      required: true,
    },
    otherImages: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
    lastOtp: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const ProductModel = model<Product>('Product', productSchema);
