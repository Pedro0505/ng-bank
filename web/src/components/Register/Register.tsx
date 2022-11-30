import React, { ChangeEvent, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
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
    <section className="register-inputs-container">
      <div className="heading-register">
        <BsPersonCircle size={ 25 } />
        <h1>Registrar</h1>
      </div>
      <TextField
        id="username-register-field"
        label="Nome do Úsuario"
        variant="outlined"
        name="username"
        style={ { paddingBottom: '50px' } }
        onChange={ handleChange }
      />
      <TextField
        id="password-register-field"
        label="Senha"
        variant="outlined"
        name="password"
        style={ { paddingBottom: '50px' } }
        type="password"
        onChange={ handleChange }

      />
      <Button style={ { backgroundColor: '#7F5AF0' } } className="register-button" variant="contained" size="large" onClick={ submitRegister }>Fazer Cadastro</Button>
      { errorExist && (
        <span className="error-message">
          { errorMessage }
        </span>
      ) }
    </section>
  );
}

export default Register;
