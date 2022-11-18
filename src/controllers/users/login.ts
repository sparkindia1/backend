import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import { issueJWT } from '../../utils/jwt';
import { UserModel } from '../../models/user';
import filterResponse from '../../utils/filterResponse';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Credentials Invalid');

  const { accessToken, refreshToken } = issueJWT({
    _id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
  });
  res.cookie('refreshToken', JSON.stringify(accessToken));
  res.cookie('accessToken', JSON.stringify(refreshToken));

  return res.status(200).json({
    user: filterResponse(user),
    message: 'Login Successful',
  });
};
