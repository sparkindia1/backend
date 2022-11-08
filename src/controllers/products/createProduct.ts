import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import filterResponse from '../../utils/filterResponse';

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
      categoryId: Number(req.body.categoryId),
      ownerId: Number(req.body.ownerId),
      brandId: Number(req.body.brandId),
      description: req.body.description || '',
      imageUrl: req.body.imageUrl || '',
      pricePerProductLevelOne: Number(req.body.pricePerProductLevelOne),
      pricePerProductLevelTwo: Number(req.body.pricePerProductLevelTwo),
      pricePerProductLevelThree: Number(req.body.pricePerProductLevelThree),
      pricePerProductLevelFour: Number(req.body.pricePerProductLevelFour),
      pricePerProductLevelFive: Number(req.body.pricePerProductLevelFive),
    },
    select: {
      brandId: true,
      categories: true,
      categoryId: true,
      description: true,
      id: true,
      name: true,
      imageUrl: true,
      levelOneLimit: true,
      levelTwoLimit: true,
      levelThreeLimit: true,
      levelFourLimit: true,
      levelFiveLimit: true,
      pricePerProductLevelOne: true,
      pricePerProductLevelTwo: true,
      pricePerProductLevelThree: true,
      pricePerProductLevelFour: true,
      pricePerProductLevelFive: true,
      verified: true,
      updatedAt: true,
    },
  });

  return res.status(201).json({
    product: filterResponse(product),
    message: 'Product created successfully',
  });
};
