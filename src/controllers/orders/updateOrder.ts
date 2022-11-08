import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.body;

  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: {
      userId: Number(req.body.userId),
      ...(req.body.itemsCharges && { itemsCharges: req.body.itemsCharges }),
      ...(req.body.otherCharges && { otherCharges: req.body.otherCharges }),
      ...(req.body.paymentMethod && { paymentMethod: req.body.paymentMethod }),
      ...(req.body.products && { products: req.body.products }),
      ...(req.body.shippingAddress && {
        shippingAddress: req.body.shippingAddress,
      }),
      ...(req.body.shippingCharges && {
        shippingCharges: req.body.shippingCharges,
      }),
      ...(req.body.status && { status: req.body.status }),
      ...(req.body.taxCharges && { taxCharges: req.body.taxCharges }),
    },
    select: {
      id: true,
      itemsCharges: true,
      otherCharges: true,
      paymentMethod: true,
      productIds: true,
      shippingAddress: true,
      shippingCharges: true,
      status: true,
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
