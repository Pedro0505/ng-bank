import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../utils/http_responses/UnauthorizedError';
import Jwt from '../utils/Jwt';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    const { reponse: { code, error } } = new UnauthorizedError('Token not found');

    return res.status(code).json({ error: { message: error.message } });
  }

  try {
    req.tokenData = Jwt.verify(authorization).tokenData;

    return next();
  } catch (error) {
    const { reponse } = new UnauthorizedError('Expired or invalid token');

    return res.status(reponse.code).json({ error: { message: reponse.error.message } });
  }
};

export default auth;
