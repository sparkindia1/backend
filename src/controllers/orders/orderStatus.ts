import { Request, Response } from 'express';

import { OrderModel } from '../../models/order';
import AppError, { STATUS_CODES } from '../../utils/errors';

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id, status } = req.params;

  const order = await OrderModel.findByIdAndUpdate(id, {
    $set: { status: status },
  });

  if (!order) throw new AppError('Order not found', STATUS_CODES.NOT_FOUND);
  return res.status(200).json({
    order,
    message: 'Order updated successfully',
  });
};
