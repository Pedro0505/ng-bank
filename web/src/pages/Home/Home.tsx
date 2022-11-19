import React, { useContext, useEffect } from 'react';
import BalanceView from '../../components/BalanceView';
import CashOutForm from '../../components/CashOutForm/CashOutForm';
import Header from '../../components/Header/Header';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import { UserContext } from '../../context/UserContext';

function Home() {
  const { fetchUserToken } = useContext(UserContext);

  useEffect(() => {
    fetchUserToken();
  }, []);

  return (
    <div>
      <Header />
      <BalanceView />
      <CashOutForm />
      <TransactionsTable />
    </div>
  );
}

export default Home;
