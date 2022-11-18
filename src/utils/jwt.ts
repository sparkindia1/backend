import JWT from 'jsonwebtoken';

import { PartialUser } from '../models/types';

const secretKey = process.env.SECRET_KEY!;

export const issueJWT = (user: PartialUser) => {
  const payload = { sub: JSON.stringify(user), iat: Date.now() };
  const accessToken = JWT.sign(payload, secretKey, {
    expiresIn: 300 /* 5 minutes */,
  });
  const refreshToken = JWT.sign(payload, secretKey, {
    expiresIn: '7d' /* 7 days */,
  });
  return { accessToken, refreshToken };
};

export const verifyJWT = (accessToken: string) => {
  try {
    const decoded = JWT.verify(accessToken, secretKey);
    return { valid: true, expired: false, payload: decoded };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      payload: null,
    };
  }
};

export const revalidate = (refreshToken: string, user: PartialUser) => {
  try {
    const decoded = JWT.verify(refreshToken, secretKey);
    if (!decoded.sub) throw new Error('Invalid token');
    if ((decoded.sub as JWT.JwtPayload)._id === user._id) return issueJWT(user);
    else return null;
  } catch (err: any) {
    return null;
  }
};
