import { ITransactionsFilterService } from './interfaces/ITransactionsFilter';
import ITransactionsRepository from './interfaces/ITransactionsRepository';
import ITransactionsService from './interfaces/ITransactionsService';

class TransactionsService implements ITransactionsService {
  private _repository: ITransactionsRepository;

  constructor(repository: ITransactionsRepository) {
    this._repository = repository;
  }

  public async getAllTransactionByAccountId(accountId: string) {
    const transactions = await this._repository.getAllTransactionByAccountId(accountId);

    return transactions;
  }

  public async filterTransactions({ accountId, type, date }: ITransactionsFilterService) {
    let debited = type === 'cashOut' ? accountId : undefined;
    let credited = type === 'cashIn' ? accountId : undefined;

    if (debited === undefined && credited === undefined) {
      debited = accountId;
      credited = accountId;
    }

    const transactions = await this._repository.filterTransactions(
      { date, debited, credited },
    );

    return transactions;
  }
}

export default TransactionsService;
