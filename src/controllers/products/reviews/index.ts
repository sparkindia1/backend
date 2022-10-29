import { Request, Response } from 'express';

export const createReview = async (req: Request, res: Response) => {
  const { productId, userId, rating, comment } = req.body;
};

export const getReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;
};

export const deleteReview = async (req: Request, res: Response) => {
  const { productId, userId } = req.params;
};

export const updateReview = async (req: Request, res: Response) => {
  const { productId, userId } = req.params;
};
