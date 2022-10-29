import { Request, Response } from 'express';

import { generateOtp } from '../../utils/helpers';
import { prisma } from '../../utils/prisma';

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id, status } = req.params;

  const order = await prisma.order.update({
    where: { id: Number(id), status },
  });

  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order updated successfully',
  });
};

export const getOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
  });
  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order status found successfully',
  });
};
