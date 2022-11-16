import { ITransactionsId, ITransactionsUsers } from './ITransactions';

interface ITransactionsRepository {
  getAllTransactionByAccountId(accountId: string): Promise<ITransactionsUsers[]>
  createTransiction(debitedAcctId: string, creditedAccId: string, value: number): Promise<ITransactionsId>
}

export default ITransactionsRepository;
