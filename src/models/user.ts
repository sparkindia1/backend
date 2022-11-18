import { model, Schema } from 'mongoose';

import { Role, User } from './types';

export const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['ADMIN', 'BUYER', 'SELLER'],
      default: Role['BUYER'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastOtp: {
      type: Number,
    },
    warnings: [
      {
        reason: {
          type: String,
          required: true,
        },
        severity: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', UserSchema);
