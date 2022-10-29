import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { prisma } from '../../utils/prisma';
import { generateOtp } from '../../utils/helpers';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOtp();
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) throw new Error('User not found');
  await prisma.tempUser.create({
    data: { otp, userId: user.id },
  });

  console.log({ otp, email, userId: user.id });
  return res.status(200).json({
    message: 'OTP sent to your email',
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { userId, otp, password } = req.body;
  const user = await prisma.tempUser.findFirst({
    where: { userId },
  });

  if (!user) throw new Error('User not found');
  if (user.otp !== otp) throw new Error('Invalid OTP');

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  await prisma.tempUser.delete({
    where: { id: user.id },
  });

  return res.status(200).json({
    message: 'Password reset successfully',
  });
};
