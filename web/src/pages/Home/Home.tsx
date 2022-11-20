import React, { useContext, useEffect } from 'react';
import './style.css';
import BalanceView from '../../components/BalanceView/BalanceView';
import CashOutForm from '../../components/CashOutForm/CashOutForm';
import Header from '../../components/Header/Header';
import TransactionsTable from '../../components/TransactionsTable/TransactionsTable';
import { UserContext } from '../../context/UserContext';
import useTokenRedirect from '../../hooks/useTokenRedirect';

function Home() {
  const { fetchUserToken } = useContext(UserContext);
  useTokenRedirect();

  useEffect(() => {
    fetchUserToken();
  }, []);

  return (
    <div>
      <Header />
      <BalanceView />
      <section className="cash-out-transaction-container">
        <CashOutForm />
        <TransactionsTable />
      </section>
    </div>
  );
}

export default Home;
