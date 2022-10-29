import { Request, Response } from 'express';

export const createBrand = async (req: Request, res: Response) => {
  const { name, tagline, logoUrl, owner } = req.body;
};
