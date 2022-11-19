import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import deleteUserToken from '../../helpers/deleteUserToken';

function Header() {
  const { fetchUserToken, userToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserToken();
  }, []);

  const handleLogOut = () => {
    deleteUserToken();

    navigate('/');
  };

  return (
    <header>
      <h1>NG.BANK</h1>
      <h1>Olá, {userToken.data.username}</h1>
      <Button variant="contained" size="large" onClick={ handleLogOut }>Logout</Button>
    </header>
  );
}

export default Header;
