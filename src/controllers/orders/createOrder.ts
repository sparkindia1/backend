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
      productIds: products,
    },
    select: {
      id: true,
      productIds: true,
      itemsCharges: true,
      otherCharges: true,
      paymentMethod: true,
      shippingAddress: true,
      shippingCharges: true,
      status: true,
      taxCharges: true,
      updatedAt: true,
    },
  });

  return res.status(201).json({
    order,
    message: 'Created Successfully',
  });
};
