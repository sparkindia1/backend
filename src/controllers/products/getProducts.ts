import { Request, Response } from 'express';
import filterResponse from '../../utils/filterResponse';
import { prisma } from '../../utils/prisma';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { deleted: false },
  });

  return res.status(200).json({
    products: filterResponse(products),
    message: 'Products fetched successfully',
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  return res.status(200).json({
    product: filterResponse(product),
    message: 'Product fetched successfully',
  });
};

export const searchProducts = async (req: Request, res: Response) => {
  const { category } = req.body;
  const products = await prisma.product.findMany({});

  return res.status(200).json({
    products: filterResponse(products),
    message: 'Products fetched successfully',
  });
};
