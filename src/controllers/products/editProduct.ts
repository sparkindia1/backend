import { Request, Response } from 'express';
import filterResponse from '../../utils/filterResponse';
import { prisma } from '../../utils/prisma';

export const editProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(productId) },
    data: { ...req.body },
  });

  return res.status(200).json({
    product: filterResponse(product),
    message: 'Product updated successfully',
  });
};
