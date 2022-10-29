import { Request, Response } from 'express';

export const editProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    quantity,
    category,
    brand,
    imageUrl,
    owner,
  } = req.body;
};

export const unlistProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
};
