import { NextFunction, Request, Response } from 'express';

interface IAccountsController {
  getBalanceByUserId(req: Request, res: Response, next?: NextFunction): Promise<Response>;
  cashOut(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}

export default IAccountsController;
