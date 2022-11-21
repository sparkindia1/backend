import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { issueJWT } from '../../utils/jwt';
import { UserModel } from '../../models/user';
import filterResponse from '../../utils/filterResponse';
import AppError, { STATUS_CODES } from '../../utils/errors';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).lean();
  if (!user) throw new AppError('User not found', STATUS_CODES.NOT_FOUND);

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new AppError('Credentials Invalid', STATUS_CODES.BAD_REQUEST);

  const { accessToken, refreshToken } = issueJWT(user);
  res.cookie('refreshToken', JSON.stringify(accessToken));
  res.cookie('accessToken', JSON.stringify(refreshToken));

  return res.status(200).json({
    user: filterResponse(user),
    message: 'Login Successful',
  });
};
