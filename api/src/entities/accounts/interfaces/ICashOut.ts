interface ICashOut {
  id: string;
  debitedAccountId: string;
  creditedAccountId: string;
  value: number;
  createdAt: Date;
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

export default ICashOut;
