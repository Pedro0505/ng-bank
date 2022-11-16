import { ITransactionsId, ITransactionsUsers } from './ITransactions';

interface ITransactionsRepository {
  getAllTransactionByAccountId(accountId: string): Promise<ITransactionsUsers[]>
}

export default ITransactionsRepository;
