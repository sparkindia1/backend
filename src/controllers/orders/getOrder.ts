import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.body;
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
  const { userId } = req.body;
  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
  });

  return res.status(200).json({
    orders,
    message: 'Orders updated successfully',
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const { userId, status } = req.body;
  const orders = await prisma.order.findMany({
    where: { userId: Number(userId), status: status as any },
  });

  return res.status(200).json({
    orders,
    message: 'Orders fetched successfully',
  });
};
