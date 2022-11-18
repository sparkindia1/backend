import { Types } from 'mongoose';
import { Request, Response } from 'express';

import { OrderModel } from '../../models/order';

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.body;
  const order = await OrderModel.findByIdAndUpdate(id, {
    $set: {
      user: new Types.ObjectId(req.body.userId),
      ...(req.body.shippingAddress && {
        shippingAddress: req.body.shippingAddress,
      }),
      ...(req.body.paymentMethod && { paymentMethod: req.body.paymentMethod }),
      ...(req.body.itemCharges && { itemCharges: req.body.itemCharges }),
      ...(req.body.taxCharges && { taxCharges: req.body.taxCharges }),
      ...(req.body.shippingCharges && {
        shippingCharges: req.body.shippingCharges,
      }),
      ...(req.body.otherCharges && { otherCharges: req.body.otherCharges }),
      ...(req.body.products && { products: req.body.productIds }),
      ...(req.body.status && { status: req.body.status }),
    },
  });

  if (!order) throw new Error('Order not found');
  return res.status(200).json({
    order,
    message: 'Order updated successfully',
  });
};
