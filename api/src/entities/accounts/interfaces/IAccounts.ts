interface IAccounts {
  balance: number;
}

interface IAccountsId extends IAccounts {
  id: string;
}


export { IAccounts, IAccountsId };
