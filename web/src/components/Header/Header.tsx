import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import deleteUserToken from '../../helpers/deleteUserToken';

function Header() {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

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
