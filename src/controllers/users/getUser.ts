import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import filterResponse from '../../utils/filterResponse';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  return res.status(200).json({
    user: filterResponse(user),
    message: 'Successful',
  });
};
