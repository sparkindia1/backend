import { Request, Response } from 'express';

export const updateBrand = async (req: Request, res: Response) => {
  const { name, tagline, logoUrl, owner } = req.body;
};
