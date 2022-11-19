import React, { createContext, useState } from 'react';
import verifyUser from '../api/verifyUser';
import getUserToken from '../helpers/getUserToken';
import IJwtToken from '../interfaces/IJwtToken';
import IUserContextProps from './interfaces/IUserContextProps';
import IUserContextType from './interfaces/IUserContextType';

const initialValue = {
  userToken: { data: { username: '', userId: '', accountId: '' } },
  fetchUser: async () => {},
};

export const UserContext = createContext<IUserContextType>(initialValue);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [userToken, setUserToken] = useState<IJwtToken>({ data: { username: '', userId: '', accountId: '' } });

  const fetchUser = async () => {
    const token = getUserToken();
    const user = await verifyUser(token as string);

    setUserToken(user);
  };

  const context = {
    fetchUser,
    userToken,
  };

  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  );
};
