import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { prisma } from '../../utils/prisma';
import { issueJWT } from '../../utils/jwt';

export const verifyAccount = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) throw new Error('User not found');

  const tempUser = await prisma.tempUser.findFirst({
    where: { userId: user.id },
  });

  if (!tempUser) throw new Error('User not found');

  if (tempUser.otp !== otp) throw new Error('Invalid OTP');

  await prisma.user.update({
    where: { id: user.id },
    data: { verified: true },
  });

  await prisma.tempUser.delete({
    where: { id: tempUser.id },
  });

  return res.status(200).send();
};

export const register = async (req: Request, res: Response) => {
  const { email, phone, password, role } = req.body;

  const user = await prisma.user.findFirst({
    where: { email, deleted: false },
  });
  if (user) throw new Error('User already exists');

  const hash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, phone, role, password: hash },
  });

  const savedUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const { accessToken, refreshToken } = issueJWT(savedUser);
  res.cookie('refreshToken', JSON.stringify(accessToken));
  res.cookie('accessToken', JSON.stringify(refreshToken));

  return res.status(200).send();
};
