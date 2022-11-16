import { IAccountsId } from './IAccounts';

interface IAccountsRepository {
  getBalanceByUserId(id: string): Promise<IAccountsId | null>;
}

export default IAccountsRepository;
