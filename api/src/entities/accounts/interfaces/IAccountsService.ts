import NotFoundError from '../../../utils/http_responses/NotFoundError';
import { IAccountsId } from './IAccounts';

interface IAccountsService {
  getBalanceByUserId(id: string): Promise<IAccountsId | NotFoundError>;
  cashOut(debitedAccountId: string, creditedUsername: string, value: number): Promise<any>;
}

export default IAccountsService;
