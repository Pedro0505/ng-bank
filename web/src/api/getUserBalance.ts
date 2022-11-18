import myAxios from './axios';
import IAccountBalanceResponse from '../interfaces/IAccountBalanceResponse';

const getUserBalance = async (token: string): Promise<IAccountBalanceResponse> => {
  const response = await myAxios.get('/accounts', { headers: { Authorization: token } });

  return response.data;
};

export default getUserBalance;
