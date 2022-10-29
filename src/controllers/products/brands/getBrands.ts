import { Request, Response } from 'express';

export const getBrands = async (req: Request, res: Response) => {
  console.log('hello');
};

export const getSingleBrand = async (req: Request, res: Response) => {
  const { brandId } = req.params;
};
