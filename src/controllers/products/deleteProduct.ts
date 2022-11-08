import { Request, Response } from 'express';
import { generateOtp } from '../../utils/helpers';
import { prisma } from '../../utils/prisma';

export const initDeleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });
  if (!product) throw new Error('Product not found');

  const otp = generateOtp();
  await prisma.tempProduct.create({
    data: { otp, productId: product.id },
  });
  console.log({ otp, productId: product.id });
  // TODO send mail to the user about this otp

  return res.status(200).json({
    message: 'OTP sent to your email',
  });
};

export const confirmDeleteProduct = async (req: Request, res: Response) => {
  const { productId, otp } = req.body;
  const tempProduct = await prisma.tempProduct.findUnique({
    where: { productId: Number(productId) },
  });
  if (!tempProduct) throw new Error('Product not found');
  if (tempProduct.otp !== otp) throw new Error('Invalid OTP');

  await prisma.product.update({
    where: { id: Number(productId) },
    data: { deleted: true },
  });

  await prisma.tempProduct.delete({
    where: { productId: Number(productId) },
  });

  return res.status(200).json({
    message: 'Product deleted successfully',
  });
};

export const cancelDeleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const tempProduct = await prisma.tempProduct.findUnique({
    where: { productId: Number(productId) },
  });

  if (!tempProduct) throw new Error('Product not found');
  // if(tempProduct.otp !== otp) throw new Error("Invalid OTP");

  await prisma.tempProduct.delete({
    where: { productId: Number(productId) },
  });

  return res.status(200).json({
    message: 'Product deletion cancelled successfully',
  });
};
