import { ITransactionsUsers } from './ITransactions';

interface ITransactionsService {
  getAllTransactionByAccountId(accountId: string): Promise<ITransactionsUsers[]>
}

export default ITransactionsService;
