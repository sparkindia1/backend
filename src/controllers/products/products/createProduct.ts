import { Request, Response } from 'express';
import { prisma } from '../../../utils/prisma';

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
    },
  });
};
