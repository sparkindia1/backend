import { Request, Response } from 'express';
import filterResponse from '../../utils/filterResponse';

import { prisma } from '../../utils/prisma';

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return res.status(200).json({
    user: filterResponse(user),
    message: 'Successful',
  });
};
