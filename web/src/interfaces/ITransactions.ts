interface ITransactions {
  id: string,
  debitedAccountId: string,
  creditedAccountId: string,
  value: number,
  createdAt: string,
  creditedAccount: {
    Users: {
      username: string,
      id: string
    }[],
  }
  debitedAccount: {
    Users: {
      username: string,
      id: string
    }[],
  }
}

export default ITransactions;
