interface ITransactions {
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: Date;
}

interface ITransactionsId extends ITransactions {
  id: string;
}

interface ITransactionsUsers extends ITransactionsId {
  creditedAccount: {
    Users: { 
      username: string, 
      id: string 
    }[]
  },
  debitedAccount: {
    Users: { 
      username: string, 
      id: string 
    }[]
  }
}

export { ITransactions, ITransactionsId, ITransactionsUsers };
