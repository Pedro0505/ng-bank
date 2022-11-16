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
}

export default TransactionsService;
