import { NextFunction, Request, Response } from 'express';

interface IUserController {
  login(req: Request, res: Response, next?: NextFunction): Promise<Response>
  register(req: Request, res: Response, next?: NextFunction): Promise<Response>
}

export default IUserController;
