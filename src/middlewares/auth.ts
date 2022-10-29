import { NextFunction, Request, Response } from 'express';

import { assertHasUser } from '../utils/auth';
import { getSession } from '../utils/sessions';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // steps
  // parse token from the session cookie
  const cookie = req.cookies;
  assertHasUser(req);

  const session = getSession(cookie.sessionId);
  if (!session) throw new Error('Unauthorized');
  // req.email = session.email;
};
