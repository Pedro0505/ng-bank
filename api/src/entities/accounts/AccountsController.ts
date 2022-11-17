import { Request, Response } from 'express';
import HttpErrors from '../../utils/http_responses/class/HttpErrors';
import IAccountsController from './interfaces/IAccountsController';
import IAccountsService from './interfaces/IAccountsService';

class AccountsController implements IAccountsController {
  private _service: IAccountsService;

  constructor(service: IAccountsService) {
    this._service = service;
  }

  public getBalanceByUserId = async (req: Request, res: Response) => {
    const { accountId } = req.tokenData;

    const service = await this._service.getBalanceByUserId(accountId);

    if (service instanceof HttpErrors) {
      const { reponse: { code, error } } = service;
      return res.status(code).json({ error });
    }

    return res.status(200).json({ data: service });
  };

  public cashOut = async (req: Request, res: Response) => {
    const { accountId } = req.tokenData;
    const { creditedUsername, value }: { creditedUsername: string, value: number } = req.body;

    const service = await this._service.cashOut(accountId, creditedUsername, +value);

    if (service instanceof HttpErrors) {
      const { reponse: { code, error } } = service;
      return res.status(code).json({ error });
    }

    return res.status(200).json({ data: service });
  };
}

export default AccountsController;
