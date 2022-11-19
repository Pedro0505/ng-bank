import React, { createContext, useState } from 'react';
import getUserBalance from '../api/getUserBalance';
import getUserTransactions from '../api/getUserTransactions';
import verifyUser from '../api/verifyUser';
import getUserToken from '../helpers/getUserToken';
import IAccountBalanceResponse from '../interfaces/IAccountBalanceResponse';
import IJwtToken from '../interfaces/IJwtToken';
import ITransactionsMap from '../interfaces/ITransactionsMap';
import IUserContextProps from './interfaces/IUserContextProps';
import IUserContextType from './interfaces/IUserContextType';

const initialValue = {
  userToken: { data: { username: '', userId: '', accountId: '' } },
  userBalance: { data: { id: '', balance: 0.00 } },
  fetchUserToken: async () => {},
  fetchUserBalance: async () => {},
  fetchUserTransactions: async () => {},
  transactions: [
    {
      id: '',
      creditedUser: '',
      debitedUser: '',
      value: 20,
      createdAt: '',
      type: '',
      transferParticipant: '',
    },
  ],
};

export const UserContext = createContext<IUserContextType>(initialValue);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [userToken, setUserToken] = useState<IJwtToken>({ data: { username: '', userId: '', accountId: '' } });
  const [userBalance, setUserBalance] = useState<IAccountBalanceResponse>({ data: { id: '', balance: 0.00 } });
  const [transactions, setTransactions] = useState<ITransactionsMap[]>(initialValue.transactions);

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

  const fetchUserTransactions = async () => {
    const token = getUserToken();
    const getTransactions = await getUserTransactions(token as string);
    const user = await verifyUser(token as string);

    const transactionsMap = getTransactions.data.map((tr) => {
      const { username: credited } = tr.creditedAccount.Users[0];
      const { username: debited } = tr.debitedAccount.Users[0];
      return {
        id: tr.id,
        createdAt: tr.createdAt.split('T')[0],
        creditedUser: credited,
        debitedUser: debited,
        transferParticipant: credited === user.data.username ? debited : credited,
        value: tr.value,
        type: tr.creditedAccount.Users[0].username === user.data.username ? 'Creditado' : 'Debitado',
      };
    });

    setTransactions(transactionsMap);
  };

  const context = {
    fetchUserToken,
    fetchUserBalance,
    fetchUserTransactions,
    userBalance,
    userToken,
    transactions,
  };

  return (
    <UserContext.Provider value={ context }>
      { children }
    </UserContext.Provider>
  );
};
