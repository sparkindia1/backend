import { Request, Response } from 'express';
import { prisma } from '../../../utils/prisma';

export const createBrand = async (req: Request, res: Response) => {
  const { name, tagline, logoUrl, owner } = req.body;
};
