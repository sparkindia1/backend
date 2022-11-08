import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id, status } = req.params;

  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status: status as any },
    select: {
      id: true,
      userId: true,
      status: true,
      itemsCharges: true,
      otherCharges: true,
      paymentMethod: true,
      productIds: true,
      shippingAddress: true,
      shippingCharges: true,
      taxCharges: true,
      updatedAt: true,
    },
  });

  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order updated successfully',
  });
};

export const getOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.body;

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
  });
  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order status found successfully',
  });
};
