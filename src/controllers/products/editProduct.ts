import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { ProductModel } from '../../models/product';
import { Product, ProductPrice } from '../../models/types';

import filterResponse from '../../utils/filterResponse';

export const editProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const product = await ProductModel.findByIdAndUpdate<Product>(productId, {
    $set: {
      categories: req.body.categoryIds.map(
        (c: string) => new Types.ObjectId(c)
      ),
      ...(req.body.bannerImage && { bannerImage: req.body.bannerImage }),
      ...(req.body.name && { name: req.body.name }),
      ...(req.body.stock && { stock: req.body.stock }),
      ...(req.body.price && {
        price: req.body.price.map((p: ProductPrice) => ({
          cost: p.cost,
          levelIndex: p.levelIndex,
          levelLimit: p.levelLimit,
        })),
      }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.body.otherImages && { otherImages: req.body.otherImages }),
    },
  });

  return res.status(200).json({
    product: filterResponse(product),
    message: 'Product updated successfully',
  });
};
