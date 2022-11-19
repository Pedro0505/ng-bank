import React, { createContext, useState } from 'react';
import getUserBalance from '../api/getUserBalance';
import verifyUser from '../api/verifyUser';
import getUserToken from '../helpers/getUserToken';
import IAccountBalanceResponse from '../interfaces/IAccountBalanceResponse';
import IJwtToken from '../interfaces/IJwtToken';
import IUserContextProps from './interfaces/IUserContextProps';
import IUserContextType from './interfaces/IUserContextType';

const initialValue = {
  userToken: { data: { username: '', userId: '', accountId: '' } },
  userBalance: { data: { id: '', balance: 0.00 } },
  fetchUserToken: async () => {},
  fetchUserBalance: async () => {},
};

export const UserContext = createContext<IUserContextType>(initialValue);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [userToken, setUserToken] = useState<IJwtToken>({ data: { username: '', userId: '', accountId: '' } });
  const [userBalance, setUserBalance] = useState<IAccountBalanceResponse>({ data: { id: '', balance: 0.00 } });

  const fetchUserToken = async () => {
    const token = getUserToken();
    const user = await verifyUser(token as string);

    setUserToken(user);
  };

  const fetchUserBalance = async () => {
    const token = getUserToken();
    const balance = await getUserBalance(token as string);

    setUserBalance(balance);
  };

  const context = {
    fetchUserToken,
    fetchUserBalance,
    userBalance,
    userToken,
  };

  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  );
};
