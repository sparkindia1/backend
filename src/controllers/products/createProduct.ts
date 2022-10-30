import { Request, Response } from 'express';
import filterResponse from '../../utils/filterResponse';
import { prisma } from '../../utils/prisma';

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
    },
  });

  return res.status(201).json({
    product: filterResponse(product),
    message: 'Product created successfully',
  });
};
