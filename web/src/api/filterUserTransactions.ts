import myAxios from './axios';
import ITransactionsFilterResponse from '../interfaces/ITransactionsFilterResponse';

const filterUserTransactions = async (filters: string, token: string)
: Promise<ITransactionsFilterResponse> => {
  const response = await myAxios.get(
    `/transactions/filter?${filters}`,
    { headers: { Authorization: token } },
  );

  return response.data;
};

export default filterUserTransactions;
