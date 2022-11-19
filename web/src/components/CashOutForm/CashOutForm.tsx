import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { UserContext } from '../../context/UserContext';
import ICashOutCreate from '../../interfaces/ICashOutCreate';
import errorList from './errorList';

function CashOutForm() {
  const { createCashOut } = useContext(UserContext);
  const [chashOutField, setCashOutField] = useState<ICashOutCreate>({ value: 0, creditedUsername: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorExist, setErrorExist] = useState<boolean>(false);
  const [isValidValue, setIsValidValue] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const handleError = (error: keyof typeof errorList) => {
    const message = errorList[error];

    setErrorExist(true);

    setErrorMessage(message || 'Opps tivemos um problema interno tente novamente');
  };

  const validateValueInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const result = event.target.value.replace(/[^\d.,]/gi, '');

    setValue(result);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCashOutField((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    const countSpecialChar = (value.match(/[.]|[,]/g) || []).length;
    if (countSpecialChar > 1) {
      setErrorMessage('Este é um formato inválido');
      setErrorExist(true);
      setIsValidValue(false);
    } else {
      setErrorMessage('');
      setErrorExist(false);
      setIsValidValue(true);
    }
  }, [value]);

  const submitCashOut = async () => {
    try {
      if (isValidValue) {
        await createCashOut({ ...chashOutField, value: +chashOutField.value });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleError(error.response?.data.error.message);
      }
    }
  };

  return (
    <div>
      <TextField
        id="creditedUser-field"
        label="Nome do Beneficiado(a)"
        variant="outlined"
        name="creditedUsername"
        onChange={ handleChange }
      />
      <TextField
        id="password-login-field"
        label="Valor a ser transferido"
        variant="outlined"
        name="value"
        onChange={ (event) => {
          handleChange(event);
          validateValueInput(event);
        } }
        value={ value }
        InputProps={{ inputProps: { min: 0 } }}
      />
      { errorExist && (
        <span>
          { errorMessage }
        </span>
      ) }
      <Button disabled={ !isValidValue } variant="contained" size="large" onClick={ submitCashOut }>Transferir</Button>
    </div>
  );
}

export default CashOutForm;
