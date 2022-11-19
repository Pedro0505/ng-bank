import IJwtToken from '../../interfaces/IJwtToken';

interface IUserContextType {
  userToken: IJwtToken,
  fetchUser(): Promise<void>,
}

export default IUserContextType;
