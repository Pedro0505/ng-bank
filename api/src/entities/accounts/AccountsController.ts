import { Request, Response } from 'express';
import BadRequest from '../../utils/http_responses/class/BadRequest';
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

    if (service instanceof BadRequest) {
      const { reponse: { code, error } } = service;
      return res.status(code).json({ error });
    }

    return res.status(200).json({ data: service });
  };
}

export default AccountsController;
