import { Request, Response } from 'express';

import { ProductModel } from '../../models/product';
import filterResponse from '../../utils/filterResponse';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({ isDeleted: false });

  return res.status(200).json({
    products: filterResponse(products),
    message: 'Products fetched successfully',
  });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const product = await ProductModel.findById(productId);

  return res.status(200).json({
    product: filterResponse(product),
    message: 'Product fetched successfully',
  });
};

export const searchProducts = async (req: Request, res: Response) => {
  const { category } = req.body;
  const products = await ProductModel.find({
    categories: { $in: category },
  });

  return res.status(200).json({
    products: filterResponse(products),
    message: 'Products fetched successfully',
  });
};
