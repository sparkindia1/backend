import { Request, Response } from 'express';

export const getProductStatus = async (req: Request, res: Response) => {
  const { productId } = req.body;
};

export const getAllProducts = async (req: Request, res: Response) => {
  console.log('hello');
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
};
