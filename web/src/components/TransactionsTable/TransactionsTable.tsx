import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { UserContext } from '../../context/UserContext';
import ITransactionsMap from '../../interfaces/ITransactionsMap';
import getUserToken from '../../helpers/getUserToken';
import getUserTransactions from '../../api/getUserTransactions';
import verifyUser from '../../api/verifyUser';

function TransactionsTable() {
  const { fetchUserTransactions, transactions } = useContext(UserContext);
  const [rows, setRows] = useState<ITransactionsMap[]>([]);

  const columns: GridColDef[] = [
    { field: 'transferParticipant', headerName: 'Autor', width: 330 },
    {
      field: 'value',
      headerName: 'Valor',
      width: 330,
      cellClassName: (params: GridCellParams<number>) => {
        if (params.value == null) {
          return '';
        }

        return clsx('super-app', {
          negative: params.row.type === 'Debitado',
          positive: params.row.type === 'Creditado',
        });
      },
    },
    {
      field: 'createdAt', headerName: 'Data da Transação', width: 230, type: 'date',
    },
    {
      field: 'type', headerName: 'Tipo de transferência', width: 200, type: 'string',
    },
  ];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        fetchUserTransactions();
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    (async () => {
      if (transactions.data.length > 0) {
        const token = getUserToken();
        const getTransactions = await getUserTransactions(token as string);
        const user = await verifyUser(token as string);

        const transactionsMap = getTransactions.data.map((tr) => {
          const { username: credited } = tr.creditedAccount.Users[0];
          const { username: debited } = tr.debitedAccount.Users[0];
          return {
            id: tr.id,
            createdAt: tr.createdAt.split('T')[0],
            creditedUser: credited,
            debitedUser: debited,
            transferParticipant: credited === user.data.username ? debited : credited,
            value: tr.value,
            type: tr.creditedAccount.Users[0].username === user.data.username ? 'Creditado' : 'Debitado',
          };
        });

        setRows(transactionsMap);
      }
    })();
  }, [transactions]);

  return (
    <div className="data-table">
      <Box
        sx={{
          height: 300,
          width: '70%',
          '& .super-app-theme--cell': {
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            color: '#ff0000',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            color: '#008000',
            fontWeight: '600',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </div>
  );
}

export default TransactionsTable;
