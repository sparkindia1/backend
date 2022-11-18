import { model, Schema } from 'mongoose';
import { SellerProfile } from './types';

export const sellerProfileSchema = new Schema<SellerProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    companyName: {
      type: String,
      required: true,
    },
    companyUsername: {
      type: String,
      required: true,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessPhone: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    panNumber: {
      type: String,
    },
    udhyogAadharNumber: {
      type: String,
    },
    startupIndiaRegistrationNumber: {
      type: String,
    },
    companyIncorporationCertificate: {
      type: String,
    },
    businessLogo: {
      type: String,
    },
    isVerifiedSeller: {
      type: Boolean,
      default: false,
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

export const SellerProfileModel = model<SellerProfile>(
  'SellerProfile',
  sellerProfileSchema
);
