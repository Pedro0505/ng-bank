interface ITransactionsFilterRepo {
  date: string | undefined;
  debited: string | undefined;
  credited: string | undefined;
}

interface ITransactionsFilterService {
  accountId: string;
  type: string | undefined;
  date: string | undefined;
}

export { ITransactionsFilterRepo, ITransactionsFilterService };
