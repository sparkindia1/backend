import { Request } from 'express';
import AppError, { STATUS_CODES } from './errors';

export type RequestWithUser = Request & {
  email?: string;
  isAuthenticated: boolean;
};

export function assertHasUser(req: Request): asserts req is RequestWithUser {
  if (!('email' in req) || !('isAuthenticated' in req)) {
    throw new AppError(
      'Request object without user found unexpectedly',
      STATUS_CODES.UNAUTHORIZED
    );
  }
}
