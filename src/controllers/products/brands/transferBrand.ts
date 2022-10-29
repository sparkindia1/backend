import { Request, Response } from 'express';

export const transferBrand = async (req: Request, res: Response) => {
  const { brandId, userId, receiverId } = req.params;
};

export const confirmTransferBrandFromSender = async (
  req: Request,
  res: Response
) => {
  const { brandId, userId } = req.params;
};

export const confirmTransferBrandFromReceiver = async (
  req: Request,
  res: Response
) => {
  const { brandId, userId } = req.params;
};
