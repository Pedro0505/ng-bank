import NotFoundError from '../../../utils/http_responses/NotFoundError';
import { IAccountsId } from './IAccounts';

interface IAccountsService {
  getBalanceByUserId(id: string): Promise<IAccountsId | NotFoundError>;
}

export default IAccountsService;
