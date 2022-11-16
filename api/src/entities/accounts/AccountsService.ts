import NotFoundError from '../../utils/http_responses/NotFoundError';
import IAccountsRepository from './interfaces/IAccountsRepository';
import IAccountsService from './interfaces/IAccountsService';

class AccountsService implements IAccountsService {
  private _service: IAccountsRepository;

  constructor(service: IAccountsRepository) {
    this._service = service;
  }

  public async getBalanceByUserId(id: string) {
    const balanceService = await this._service.getBalanceByUserId(id);

    if (!balanceService) {
      return new NotFoundError('Account not found');
    }

    return balanceService;
  }
}

export default AccountsService;
