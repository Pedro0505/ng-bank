import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { UserContext } from '../../context/UserContext';
import ITransactionsMap from '../../interfaces/ITransactionsMap';

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
    setRows(transactions);
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
