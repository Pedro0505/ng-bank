import ICashOutCreate from '../interfaces/ICashOutCreate';
import ICashOutResponse from '../interfaces/ICashOutResponse';
import myAxios from './axios';

const userCashOut = async (created: ICashOutCreate, token: string): Promise<ICashOutResponse> => {
  const response = await myAxios.put(
    '/accounts/cashOut',
    { creditedUsername: created.creditedUsername, value: created.value },
    { headers: { Authorization: token } },
  );

  return response.data;
};

export default userCashOut;
