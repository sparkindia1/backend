import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validate =
  (schema: z.ZodSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await schema.parseAsync(req.body);
      req.body = value;
      next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };
