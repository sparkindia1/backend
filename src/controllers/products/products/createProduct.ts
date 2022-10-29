import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
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
