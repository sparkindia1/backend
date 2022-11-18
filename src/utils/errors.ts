import { NextFunction, Request, Response } from 'express';

class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    AppError.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  console.error(err);
  return res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    message: err.message || err.status || 'Internal Server Error',
  });
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export default AppError;
