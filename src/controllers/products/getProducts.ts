import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import filterResponse from '../../utils/filterResponse';

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
    where: { id: Number(productId) },
  });

  return res.status(200).json({
    product: filterResponse(product),
    message: 'Product fetched successfully',
  });
};

export const searchProducts = async (req: Request, res: Response) => {
  // array of categories
  const { category } = req.body;
  const products = await prisma.product.findMany({
    where: {
      categoryId: {
        in: category,
      },
    },
  });

  return res.status(200).json({
    products: filterResponse(products),
    message: 'Products fetched successfully',
  });
};
