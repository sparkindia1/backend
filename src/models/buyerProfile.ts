import { model, Schema } from 'mongoose';

import { BuyerProfile } from './types';

export const buyerProfileSchema = new Schema<BuyerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export const BuyerProfileModel = model<BuyerProfile>(
  'BuyerProfile',
  buyerProfileSchema
);
