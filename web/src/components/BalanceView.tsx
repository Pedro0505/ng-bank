import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

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
    <div>
      <p>Saldo { userBalance.data.balance.toFixed(2) }</p>
    </div>
  );
}

export default BalanceView;
