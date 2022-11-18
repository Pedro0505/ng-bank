import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import setUserToken from '../../helpers/setUserToken';
import ICreateUserRegister from '../../interfaces/ICreateUserRegister';
import userRegister from '../../api/userRegister';
import errorList from './errorList';

function Register() {
  const [registerField, setRegisterField] = useState<ICreateUserRegister>({ password: '', username: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleError = (error: keyof typeof errorList) => {
    const message = errorList[error];

    setErrorExist(true);

    setErrorMessage(message || 'Opps tivemos um problema interno tente novamente');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRegisterField((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const submitRegister = async () => {
    try {
      const { token } = await userRegister(registerField);

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
        id="username-register-field"
        label="Nome do Úsuario"
        variant="outlined"
        name="username"
        onChange={ handleChange }
      />
      <TextField
        id="password-register-field"
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
      <Button variant="contained" size="large" onClick={ submitRegister }>Fazer Cadastro</Button>
    </div>
  );
}

export default Register;
