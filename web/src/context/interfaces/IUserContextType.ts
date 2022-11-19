import IAccountBalanceResponse from '../../interfaces/IAccountBalanceResponse';
import ICashOutCreate from '../../interfaces/ICashOutCreate';
import IJwtToken from '../../interfaces/IJwtToken';
import ITrasnsactionsResponse from '../../interfaces/ITrasnsactionsResponse';

interface IUserContextType {
  userToken: IJwtToken;
  userBalance: IAccountBalanceResponse;
  transactions: ITrasnsactionsResponse
  fetchUserToken(): Promise<void>;
  fetchUserBalance(): Promise<void>;
  fetchUserTransactions(): Promise<void>;
  createCashOut(data: ICashOutCreate): Promise<void>;
}

export default IUserContextType;
