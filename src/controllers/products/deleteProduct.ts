import { Request, Response } from 'express';

import { generateOtp } from '../../utils/helpers';
import { ProductModel } from '../../models/product';
import AppError, { STATUS_CODES } from '../../utils/errors';

export const initDeleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const otp = generateOtp();
  // TODO send mail to the user about this otp

  const product = await ProductModel.findByIdAndUpdate(productId, {
    $set: { lastOtp: otp },
  });
  if (!product) throw new AppError('Product not found', STATUS_CODES.NOT_FOUND);

  console.log({ otp, productId: product._id });

  return res.status(200).json({
    message: 'OTP sent to your email',
  });
};

export const confirmDeleteProduct = async (req: Request, res: Response) => {
  const { productId, otp } = req.body;

  const tempProduct = await ProductModel.findById(productId);
  if (!tempProduct)
    throw new AppError('Product not found', STATUS_CODES.NOT_FOUND);
  if (tempProduct.lastOtp !== otp)
    throw new AppError('Invalid OTP', STATUS_CODES.BAD_REQUEST);
  await ProductModel.findByIdAndUpdate(productId, {
    $set: {
      isDeleted: true,
      lastOtp: 0,
    },
  });

  return res.status(200).json({
    message: 'Product deleted successfully',
  });
};

export const cancelDeleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;

  await ProductModel.findByIdAndUpdate(productId, {
    $set: { lastOtp: 0 },
  });

  return res.status(200).json({
    message: 'Product deletion cancelled successfully',
  });
};
