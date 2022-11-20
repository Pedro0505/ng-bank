import React from 'react';
import './style.css';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import useTokenRedirect from '../../hooks/useTokenRedirect';

function SignUp() {
  useTokenRedirect();
  return (
    <main className="main-login-page">
      <Register />
      <Login />
      <svg className="sign-up-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#272343" fillOpacity="1" d="M0,192L34.3,165.3C68.6,139,137,85,206,69.3C274.3,53,343,75,411,112C480,149,549,203,617,192C685.7,181,754,107,823,117.3C891.4,128,960,224,1029,256C1097.1,288,1166,256,1234,218.7C1302.9,181,1371,139,1406,117.3L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    </main>
  );
}

export default SignUp;
