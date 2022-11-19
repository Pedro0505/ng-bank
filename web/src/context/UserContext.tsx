import React, { createContext, useState } from 'react';
import getUserBalance from '../api/getUserBalance';
import getUserTransactions from '../api/getUserTransactions';
import userCashOut from '../api/userCashOut';
import verifyUser from '../api/verifyUser';
import getUserToken from '../helpers/getUserToken';
import IAccountBalanceResponse from '../interfaces/IAccountBalanceResponse';
import ICashOutCreate from '../interfaces/ICashOutCreate';
import IJwtToken from '../interfaces/IJwtToken';
import ITrasnsactionsResponse from '../interfaces/ITrasnsactionsResponse';
import IUserContextProps from './interfaces/IUserContextProps';
import IUserContextType from './interfaces/IUserContextType';

const initialValue = {
  userToken: { data: { username: '', userId: '', accountId: '' } },
  userBalance: { data: { id: '', balance: 0.00 } },
  fetchUserToken: async () => {},
  fetchUserBalance: async () => {},
  fetchUserTransactions: async () => {},
  createCashOut: async () => {},
  transactions: {
    data: [
      {
        id: '',
        debitedAccountId: '',
        creditedAccountId: '',
        value: 20,
        createdAt: '',
        creditedAccount: { Users: [{ username: '', id: '' }] },
        debitedAccount: { Users: [{ username: '', id: '' }] },
      },
    ],
  },
};

export const UserContext = createContext<IUserContextType>(initialValue);

export const UserProvider = ({ children }: IUserContextProps) => {
  const [userToken, setUserToken] = useState<IJwtToken>({ data: { username: '', userId: '', accountId: '' } });
  const [userBalance, setUserBalance] = useState<IAccountBalanceResponse>({ data: { id: '', balance: 0.00 } });
  const [transactions, setTransactions] = useState<ITrasnsactionsResponse>(
    initialValue.transactions,
  );

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

    setTransactions(getTransactions);
  };

  const createCashOut = async (data: ICashOutCreate) => {
    const token = getUserToken();
    const cashOut = await userCashOut(data, token as string);
    const newBalance = userBalance.data.balance - data.value;

    setUserBalance((prevState) => ({ data: { id: prevState.data.id, balance: newBalance } }));
    setTransactions((prevState) => ({ data: [...prevState.data, cashOut.data] }));
  };

  const context = {
    fetchUserToken,
    fetchUserBalance,
    fetchUserTransactions,
    createCashOut,
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
