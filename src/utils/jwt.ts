import JWT from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY!;

export const issueJWT = (user: any) => {
  const payload = { sub: user.userID, iat: Date.now() };
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

export const revalidate = (refreshToken: string, user: any) => {
  try {
    const decoded = JWT.verify(refreshToken, secretKey);
    if (decoded.sub === user.userID) return issueJWT(user);
    else return null;
  } catch (err: any) {
    return null;
  }
};
