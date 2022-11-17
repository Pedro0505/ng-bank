import BadRequest from '../../utils/http_responses/BadRequest';
import InternalServerError from '../../utils/http_responses/InternalServerError';
import NotFoundError from '../../utils/http_responses/NotFoundError';
import ITransactionsRepository from '../transactions/interfaces/ITransactionsRepository';
import IUsersRepository from '../users/interfaces/IUsersRepository';
import IAccountsRepository from './interfaces/IAccountsRepository';
import IAccountsService from './interfaces/IAccountsService';

class AccountsService implements IAccountsService {
  private _repository: IAccountsRepository;
  private _usersRepository: IUsersRepository;
  private _transactionRepository: ITransactionsRepository;

  constructor(
    service: IAccountsRepository,
    usersRepository: IUsersRepository,
    transactionRepository: ITransactionsRepository,
  ) {
    this._repository = service;
    this._usersRepository = usersRepository;
    this._transactionRepository = transactionRepository;
  }
  public async getBalanceByUserId(id: string) {
    const balanceService = await this._repository.getBalanceByUserId(id);

    if (!balanceService) {
      return new NotFoundError('Account not found');
    }

    return balanceService;
  }

  public async cashOut(debitedAccountId: string, creditedUsername: string, value: number) {
    const fixedValue = +(value.toFixed(2));
    const creditedUser = await this._usersRepository.getUserByUsername(creditedUsername);
    const debitedUser = await this._repository.getBalanceByUserId(debitedAccountId);

    if (!creditedUser || !debitedUser) {
      return new NotFoundError('User not found');
    }

    if (debitedUser.balance < fixedValue) {
      return new BadRequest('Balance is not enough');
    }

    try {
      const chashOutRepo = await this._repository.chashOut(
        debitedAccountId, creditedUser.accountId, fixedValue,
      );

      if (chashOutRepo === null) {
        return new NotFoundError('Account not found');
      }

      const transaction = this._transactionRepository.createTransiction(
        chashOutRepo.debited.id,
        chashOutRepo.credited.id,
        fixedValue,
      );

      return transaction;
    } catch (error) {
      return new InternalServerError('Oops, something went wrong with your transaction, please try again!');
    }
  }
}

export default AccountsService;
