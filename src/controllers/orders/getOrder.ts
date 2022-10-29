import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
  });

  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order found successfully',
  });
};

export const getMyOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
  });

  if (!orders) throw new Error('Orders not found');
  return res.status(200).json({
    orders,
    message: 'Orders updated successfully',
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const { userId, status } = req.params;
  const orders = await prisma.order.findMany({
    where: { userId: Number(userId), status },
  });

  if (!orders) throw new Error('Orders not found');
  return res.status(200).json({
    orders,
    message: 'Orders updated successfully',
  });
};
