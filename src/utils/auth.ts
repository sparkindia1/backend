import { Request } from 'express';

export type RequestWithUser = Request & {
  email?: string;
  isAuthenticated: boolean;
};

export function assertHasUser(req: Request): asserts req is RequestWithUser {
  if (!('email' in req) || !('isAuthenticated' in req)) {
    throw new Error('Request object without user found unexpectedly');
  }
}
