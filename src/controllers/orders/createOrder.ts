import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';

export const createOrder = async (req: Request, res: Response) => {
  const {
    userId,
    products,
    shippingAddress,
    paymentMethod,
    itemsCharges,
    shippingCharges,
    taxCharges,
    otherCharges,
  } = req.body;
  const order = await prisma.order.create({
    data: {
      userId,
      shippingAddress,
      paymentMethod,
      itemsCharges,
      shippingCharges,
      taxCharges,
      otherCharges,
      products,
    },
  });

  return res.status(201).json({
    order,
    message: 'Created Successfully',
  });
};
