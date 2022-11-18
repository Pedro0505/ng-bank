import myAxios from './axios';
import ICreateUserRegister from '../interfaces/ICreateUserRegister';
import IRegisterResponse from '../interfaces/IRegisterResponse';

const userRegister = async (user: ICreateUserRegister): Promise<IRegisterResponse> => {
  const login = await myAxios.post('/user/register', {
    username: user.username,
    password: user.password,
  });

  return login.data;
};

export default userRegister;
