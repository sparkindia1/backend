import { model, Schema } from 'mongoose';
import { Order, Status } from './types';

export const orderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    itemCharges: {
      type: Number,
      required: true,
    },
    taxCharges: {
      type: Number,
      required: true,
    },
    shippingCharges: {
      type: Number,
      required: true,
    },
    otherCharges: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        'CREATED',
        'RECEIVED',
        'PACKED',
        'IN_TRANSIT',
        'DELIVERED',
        'CANCELLED',
      ],
      required: true,
      default: Status['CREATED'],
    },
    lastOtp: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const OrderModel = model<Order>('Order', orderSchema);
