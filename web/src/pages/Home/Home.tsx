import React, { useContext, useEffect } from 'react';
import BalanceView from '../../components/BalanceView';
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
      <TransactionsTable />
    </div>
  );
}

export default Home;
