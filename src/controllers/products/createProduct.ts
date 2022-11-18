import { Types } from 'mongoose';
import { Request, Response } from 'express';

import { ProductPrice } from '../../models/types';
import { ProductModel } from '../../models/product';
import filterResponse from '../../utils/filterResponse';

export const createProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.create({
    categories: req.body.categoryIds,
    // @ts-ignore
    owner: new Types.ObjectId(req.body.ownerId),
    bannerImage: req.body.bannerImage,
    name: req.body.name,
    stock: req.body.stock,
    price: req.body.price.map((p: ProductPrice) => ({
      cost: p.cost,
      levelIndex: p.levelIndex,
      levelLimit: p.levelLimit,
    })),
  });

  return res.status(201).json({
    product: filterResponse(product),
    message: 'Product created successfully',
  });
};
