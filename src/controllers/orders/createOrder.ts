import { Request, Response } from 'express';

import { Order } from '../../models/types';
import { OrderModel } from '../../models/order';

export const createOrder = async (req: Request, res: Response) => {
  const {
    userId,
    productIds,
    shippingAddress,
    paymentMethod,
    itemCharges,
    shippingCharges,
    taxCharges,
    otherCharges,
  } = req.body;
  const order = await OrderModel.create({
    user: userId,
    shippingAddress,
    paymentMethod,
    itemCharges,
    shippingCharges,
    taxCharges,
    otherCharges,
    products: productIds,
  });

  return res.status(201).json({
    order,
    message: 'Created Successfully',
  });
};
