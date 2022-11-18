import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import ICreateUserLogin from '../../interfaces/ICreateUserLogin';
import userLogin from '../../api/userLogin';
import setUserToken from '../../helpers/setUserToken';
import errorList from './errorList';

function Login() {
  const [loginField, setLoginField] = useState<ICreateUserLogin>({ password: '', username: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleError = (error: keyof typeof errorList) => {
    const message = errorList[error];

    setErrorExist(true);

    setErrorMessage(message || 'Opps tivemos um problema interno tente novamente');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginField((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const submitLogin = async () => {
    try {
      const { token } = await userLogin(loginField);

      setUserToken(token);
      navigate('/home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        handleError(error.response?.data.error.message);
      }
    }
  };

  return (
    <div>
      <TextField
        id="username-login-field"
        label="Nome do Úsuario"
        variant="outlined"
        name="username"
        onChange={ handleChange }
      />
      <TextField
        id="password-login-field"
        label="Senha"
        variant="outlined"
        name="password"
        type="password"
        onChange={ handleChange }

      />
      { errorExist && (
        <div>
          <p>
            { errorMessage }
          </p>
        </div>
      ) }
      <Button variant="contained" size="large" onClick={ submitLogin }>Entrar</Button>
    </div>
  );
}

export default Login;
