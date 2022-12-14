import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { issueJWT } from '../../utils/jwt';
import { UserModel } from '../../models/user';
import { generateOtp } from '../../utils/helpers';
import AppError, { STATUS_CODES } from '../../utils/errors';

// Step 2
export const verifyAccount = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new AppError('User not found', STATUS_CODES.NOT_FOUND);

  if (user.lastOtp !== otp)
    throw new AppError('Invalid OTP', STATUS_CODES.BAD_REQUEST);
  await UserModel.findByIdAndUpdate(user._id, {
    $set: {
      isVerified: true,
      lastOtp: 0,
    },
  });

  return res.status(200).json({
    message: 'Account verified',
  });
};

// Step 1
export const register = async (req: Request, res: Response) => {
  const { email, name, phone, password, role } = req.body;

  const user = await UserModel.findOne({ email });
  if (user) throw new AppError('User already exists', STATUS_CODES.BAD_REQUEST);

  const otp = generateOtp();
  // TODO: send to mail

  const hash = await bcrypt.hash(password, 12);
  const savedUser = await UserModel.create({
    name,
    email,
    phone,
    role,
    password: hash,
    lastOtp: otp,
  });

  const { accessToken, refreshToken } = issueJWT(savedUser);
  res.cookie('refreshToken', JSON.stringify(accessToken));
  res.cookie('accessToken', JSON.stringify(refreshToken));

  return res.status(200).json({
    message: 'Registration Successful',
    user: savedUser,
  });
};
