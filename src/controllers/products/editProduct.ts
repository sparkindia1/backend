import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import filterResponse from '../../utils/filterResponse';

export const editProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(productId) },
    data: {
      ...req.body,
      ...(req.body.categoryId && { categoryId: Number(req.body.categoryId) }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.body.imageUrl && { imageUrl: req.body.imageUrl }),
      ...(req.body.levelOneLimit && { levelOneLimit: req.body.levelOneLimit }),
      ...(req.body.levelTwoLimit && { levelTwoLimit: req.body.levelTwoLimit }),
      ...(req.body.levelThreeLimit && {
        levelThreeLimit: req.body.levelThreeLimit,
      }),
      ...(req.body.levelFourLimit && {
        levelFourLimit: req.body.levelFourLimit,
      }),
      ...(req.body.levelFiveLimit && {
        levelFiveLimit: req.body.levelFiveLimit,
      }),
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.pricePerProductLevelOne && {
        pricePerProductLevelOne: Number(req.body.pricePerProductLevelOne),
      }),
      ...(req.body.pricePerProductLevelTwo && {
        pricePerProductLevelTwo: Number(req.body.pricePerProductLevelTwo),
      }),
      ...(req.body.pricePerProductLevelThree && {
        pricePerProductLevelThree: Number(req.body.pricePerProductLevelThree),
      }),
      ...(req.body.pricePerProductLevelFour && {
        pricePerProductLevelFour: Number(req.body.pricePerProductLevelFour),
      }),
      ...(req.body.pricePerProductLevelFive && {
        pricePerProductLevelFive: Number(req.body.pricePerProductLevelFive),
      }),
      ...(req.body.stock && { stock: Number(req.body.stock) }),
    },
    select: {
      brandId: true,
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
      stock: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    product: filterResponse(product),
    message: 'Product updated successfully',
  });
};
