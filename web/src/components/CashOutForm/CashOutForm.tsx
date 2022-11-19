import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import ICashOutCreate from '../../interfaces/ICashOutCreate';

function CashOutForm() {
  const { createCashOut } = useContext(UserContext);
  const [chashOutField, setCashOutField] = useState<ICashOutCreate>({ value: 0, creditedUsername: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCashOutField((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const submitCashOut = async () => {
    await createCashOut({ ...chashOutField, value: +chashOutField.value });
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
        type="number"
        onChange={ handleChange }
      />
      <Button variant="contained" size="large" onClick={ submitCashOut }>Transferir</Button>
    </div>
  );
}

export default CashOutForm;
