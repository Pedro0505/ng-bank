import { ITransactionsId, ITransactionsUsers } from './ITransactions';
import { ITransactionsFilterRepo } from './ITransactionsFilter';

interface ITransactionsRepository {
  getAllTransactionByAccountId(accountId: string): Promise<ITransactionsUsers[]>
  createTransiction(debitedAcctId: string, creditedAccId: string, value: number): Promise<ITransactionsUsers>
  filterTransactions({ date, debited, credited }: ITransactionsFilterRepo): Promise<ITransactionsUsers[]>;
}

export default ITransactionsRepository;
