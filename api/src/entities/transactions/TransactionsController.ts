import { Request, Response } from 'express';
import ITransactionsController from './interfaces/ITransactionsController';
import ITransactionsService from './interfaces/ITransactionsService';

class TransactionsController implements ITransactionsController {
  private _service: ITransactionsService;

  constructor(service: ITransactionsService) {
    this._service = service;
  }
  public getAllTransactionByAccountId = async (req: Request, res: Response) => {
    const { accountId } = req.tokenData;

    const service = await this._service.getAllTransactionByAccountId(accountId);

    return res.status(200).json({ data: service });
  };
}

export default TransactionsController;
