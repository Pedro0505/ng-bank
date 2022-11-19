import IAccountBalanceResponse from '../../interfaces/IAccountBalanceResponse';
import IJwtToken from '../../interfaces/IJwtToken';
import ITransactionsMap from '../../interfaces/ITransactionsMap';

interface IUserContextType {
  userToken: IJwtToken;
  userBalance: IAccountBalanceResponse;
  transactions: ITransactionsMap[]
  fetchUserToken(): Promise<void>;
  fetchUserBalance(): Promise<void>;
  fetchUserTransactions(): Promise<void>;
}

export default IUserContextType;
