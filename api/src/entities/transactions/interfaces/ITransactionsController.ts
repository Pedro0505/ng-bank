import { NextFunction, Request, Response } from 'express';

interface ITransactionsController {
  getAllTransactionByAccountId(req: Request, res: Response, next?: NextFunction): Promise<Response>;
  filterTransactions(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}

export default ITransactionsController;
