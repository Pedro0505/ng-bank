import React from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import useTokenRedirect from '../../hooks/useTokenRedirect';

function SignUp() {
  useTokenRedirect();
  return (
    <main>
      <Register />
      <Login />
    </main>
  );
}

export default SignUp;
