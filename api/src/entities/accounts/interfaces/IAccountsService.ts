import BadRequest from '../../../utils/http_responses/BadRequest';
import InternalServerError from '../../../utils/http_responses/InternalServerError';
import NotFoundError from '../../../utils/http_responses/NotFoundError';
import { IAccountsId } from './IAccounts';
import ICashOut from './ICashOut';

interface IAccountsService {
  getBalanceByUserId(id: string): Promise<IAccountsId | NotFoundError>;
  cashOut(debitedAccountId: string, creditedUsername: string, value: number): Promise<ICashOut | NotFoundError | BadRequest | InternalServerError>;
}

export default IAccountsService;
