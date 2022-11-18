import { Request, Response } from 'express';

import { Status } from '../../models/types';
import { OrderModel } from '../../models/order';
import { generateOtp } from '../../utils/helpers';
import AppError, { STATUS_CODES } from '../../utils/errors';

export const initDeleteOrder = async (req: Request, res: Response) => {
  const { id } = req.body;
  const otp = generateOtp();
  // TODO send mail to user

  const order = await OrderModel.findByIdAndUpdate(id, {
    $set: {
      lastOtp: otp,
    },
  });
  if (!order) throw new AppError('Order not found', STATUS_CODES.NOT_FOUND);

  return res.status(200).json({
    message: "OTP sent to user's email",
  });
};

export const confirmDeleteOrder = async (req: Request, res: Response) => {
  const { id, otp } = req.body;
  const order = await OrderModel.findById(id);

  if (!order) throw new AppError('Invalid OTP', STATUS_CODES.BAD_REQUEST);
  if (order.lastOtp !== otp)
    throw new AppError('Invalid OTP', STATUS_CODES.BAD_REQUEST);

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
