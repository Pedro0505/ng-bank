import { Request, Response } from 'express';

interface IUserController {
  login(req: Request, res: Response): Promise<Response>
  register(req: Request, res: Response): Promise<Response>
}

export default IUserController;
