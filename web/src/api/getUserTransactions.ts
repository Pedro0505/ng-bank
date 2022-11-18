import ITrasnsactionsResponse from '../interfaces/ITrasnsactionsResponse';
import myAxios from './axios';

const getUserTransactions = async (token: string): Promise<ITrasnsactionsResponse> => {
  const response = await myAxios.get('/transactions', { headers: { Authorization: token } });

  return response.data;
};

export default getUserTransactions;
