import { Request, Response } from 'express';

export const deleteBrand = async (req: Request, res: Response) => {
  const { brandId, userId } = req.params;
};
