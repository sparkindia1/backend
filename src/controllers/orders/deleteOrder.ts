import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import { generateOtp } from '../../utils/helpers';

export const initDeleteOrder = async (req: Request, res: Response) => {
  const { id } = req.body;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
  });
  if (!order) throw new Error('Order not found');

  // TODO send mail to user
  const otp = generateOtp();

  await prisma.tempOrder.create({
    data: { userId: order.userId, otp },
  });

  return res.status(200).json({
    message: "OTP sent to user's email",
  });
};

export const confirmDeleteOrder = async (req: Request, res: Response) => {
  const { id, otp } = req.body;
  const order = await prisma.tempOrder.findUnique({
    where: { userId: Number(id) },
  });

  if (!order) throw new Error('Invalid OTP');
  if (order.otp !== otp) throw new Error('Invalid OTP');

  await prisma.tempOrder.delete({
    where: { userId: Number(id) },
  });

  await prisma.order.update({
    where: { id: Number(id) },
    data: { status: 'CANCELLED' },
  });

  return res.status(200).json({
    message: 'Order deleted successfully',
  });
};

export const cancelDeleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.tempOrder.delete({
    where: { id: Number(id) },
  });

  return res.status(200).json({
    message: 'Order deleted successfully',
  });
};
