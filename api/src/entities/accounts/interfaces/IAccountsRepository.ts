import { IAccountsId } from './IAccounts';

interface IAccountsRepository {
  getBalanceByUserId(id: string): Promise<IAccountsId | null>;
  chashOut(debitedAccountId: string, creditedAccountId: string, value: number): Promise<{ credited: IAccountsId, debited: IAccountsId } | null>;
}

export default IAccountsRepository;
