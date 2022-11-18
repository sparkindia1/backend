import { Request, Response } from 'express';

import { Status } from '../../models/types';
import { OrderModel } from '../../models/order';
import { generateOtp } from '../../utils/helpers';

export const initDeleteOrder = async (req: Request, res: Response) => {
  const { id } = req.body;
  const otp = generateOtp();
  // TODO send mail to user

  const order = await OrderModel.findByIdAndUpdate(id, {
    $set: {
      lastOtp: otp,
    },
  });
  if (!order) throw new Error('Order not found');

  return res.status(200).json({
    message: "OTP sent to user's email",
  });
};

export const confirmDeleteOrder = async (req: Request, res: Response) => {
  const { id, otp } = req.body;
  const order = await OrderModel.findById(id);

  if (!order) throw new Error('Invalid OTP');
  if (order.lastOtp !== otp) throw new Error('Invalid OTP');

  await OrderModel.findByIdAndUpdate(id, {
    $set: {
      status: Status['CANCELLED'],
      lastOtp: 0,
    },
  });

  return res.status(200).json({
    message: 'Order deleted successfully',
  });
};
