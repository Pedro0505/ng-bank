import ICreateUserLogin from '../interfaces/ICreateUserLogin';
import ILoginResponse from '../interfaces/ILoginResponse';
import myAxios from './axios';

const userLogin = async ({ password, username }: ICreateUserLogin): Promise<ILoginResponse> => {
  const login = await myAxios.post('/user/login', { username, password });

  return login.data;
};

export default userLogin;
