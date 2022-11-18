import { Request, Response } from 'express';

import { OrderModel } from '../../models/order';

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id, status } = req.params;

  const order = await OrderModel.findByIdAndUpdate(id, {
    $set: { status: status },
  });

  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order updated successfully',
  });
};
