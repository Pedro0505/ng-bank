import { ITransactionsUsers } from './ITransactions';
import { ITransactionsFilterService } from './ITransactionsFilter';

interface ITransactionsService {
  getAllTransactionByAccountId(accountId: string): Promise<ITransactionsUsers[]>;
  filterTransactions({ accountId, type, date }: ITransactionsFilterService): Promise<ITransactionsUsers[]>;
}

export default ITransactionsService;
