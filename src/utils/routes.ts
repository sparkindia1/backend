import { NextFunction, Request, Response } from 'express';

export const makeSafe = (
  check: (
    req: Request,
    res: Response,
    next?: NextFunction
  ) => Promise<Response<any, Record<string, any>> | undefined>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(check(req, res, next)).catch(next);
  };
};

export const healthCheck = async (_: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'Running OK',
    timestamp: Date.now(),
  };
  try {
    return res.status(200).send(healthcheck);
  } catch (error: any) {
    healthcheck.message = JSON.stringify(error.message || 'An error occured');
    res.status(503).send(healthCheck);
  }
};
