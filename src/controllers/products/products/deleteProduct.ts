import { Request, Response } from 'express';

export const initDeleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  // generate an otp corresponding to the product
  // add the product in the TempProducts table
};

export const confirmDeleteProduct = async (req: Request, res: Response) => {
  const { productId, otp } = req.body;
};

export const cancelDeleteProduct = async (req: Request, res: Response) => {
  const { productId, otp } = req.body;
};
