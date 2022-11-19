import IAccountBalanceResponse from '../../interfaces/IAccountBalanceResponse';
import IJwtToken from '../../interfaces/IJwtToken';

interface IUserContextType {
  userToken: IJwtToken,
  userBalance: IAccountBalanceResponse,
  fetchUserToken(): Promise<void>,
  fetchUserBalance(): Promise<void>,
}

export default IUserContextType;
