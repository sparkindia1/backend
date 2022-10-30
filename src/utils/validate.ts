import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

const checkers = ['body', 'params', 'query'] as const;
type Checker = typeof checkers[number];

export const validate =
  (schema: z.ZodSchema<any>, toCheck?: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let whatToCheck: Checker = 'body';
      if (toCheck) {
        if (checkers.includes(toCheck as Checker)) {
          whatToCheck = toCheck as Checker;
        }
      }
      const value = await schema.parseAsync(req[whatToCheck]);
      req.body = value;
      next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };
