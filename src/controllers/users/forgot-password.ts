import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { UserModel } from '../../models/user';
import { generateOtp } from '../../utils/helpers';

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOtp();
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');
  await UserModel.findByIdAndUpdate(user._id, {
    $set: { lastOtp: otp },
  });

  console.log({ otp, email, userId: user.id });
  return res.status(200).json({
    message: 'OTP sent to your email',
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { userId, otp, password } = req.body;

  const user = await UserModel.findById(userId);

  if (!user) throw new Error('User not found');
  if (user.lastOtp !== otp) throw new Error('Invalid OTP');

  const hashedPassword = await bcrypt.hash(password, 12);

  await UserModel.findByIdAndUpdate(userId, {
    $set: {
      password: hashedPassword,
      lastOtp: 0,
    },
  });

  return res.status(200).json({
    message: 'Password reset successfully',
  });
};
