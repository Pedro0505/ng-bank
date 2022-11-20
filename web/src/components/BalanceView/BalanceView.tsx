import React, { useContext, useEffect } from 'react';
import './style.css';
import { UserContext } from '../../context/UserContext';

function BalanceView() {
  const { fetchUserBalance, userBalance } = useContext(UserContext);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        fetchUserBalance();
      } catch (error) {
        console.log(error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="balance-container">
      <h1>Saldo:</h1>
      <h1>R$ { userBalance.data.balance.toFixed(2) }</h1>
    </div>
  );
}

export default BalanceView;
