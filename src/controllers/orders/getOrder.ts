import { Types } from 'mongoose';
import { Request, Response } from 'express';

import { OrderModel } from '../../models/order';

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.body;

  const order = await OrderModel.findById(id);
  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order found successfully',
  });
};

export const getMyOrders = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const orders = await OrderModel.find({
    user: new Types.ObjectId(userId),
  });

  return res.status(200).json({
    orders,
    message: 'Orders updated successfully',
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  const orders = await OrderModel.find({
    $or: [{ user: new Types.ObjectId(userId) }, { status: status }],
  });

  return res.status(200).json({
    orders,
    message: 'Orders fetched successfully',
  });
};
