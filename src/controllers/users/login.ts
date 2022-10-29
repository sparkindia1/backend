import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { issueJWT } from '../../utils/jwt';
import { prisma } from '../../utils/prisma';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Credentials Invalid');

  const { accessToken, refreshToken } = issueJWT(user);

  res.cookie('refreshToken', JSON.stringify(accessToken));
  res.cookie('accessToken', JSON.stringify(refreshToken));

  return res.status(200).json(user);
};

export default login;
