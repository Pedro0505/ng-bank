import IJwtToken from '../interfaces/IJwtToken';
import myAxios from './axios';

const verifyUser = async (token: string): Promise<IJwtToken> => {
  const user = await myAxios.get('/user/verify', { headers: { Authorization: token } });

  return user.data;
};

export default verifyUser;
