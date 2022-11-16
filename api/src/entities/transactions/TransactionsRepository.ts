import OrmInjection from '../../class/OrmInjection';
import ITransactionsRepository from './interfaces/ITransactionsRepository';

class TransactionsRepository implements ITransactionsRepository {
  private _prisma: OrmInjection;

  constructor(orm: OrmInjection) {
    this._prisma = orm;
  }

  public async getAllTransactionByAccountId(accountId: string) {
    const transactions = await this._prisma.transactions.findMany({
      where: { OR: [
        { creditedAccountId: accountId },
        { debitedAccountId: accountId },
      ] },
      include: {
        creditedAccount: {
          select: {
            Users: {
              select: {
                username: true,
                id: true,
              },
            },
          },
        },
        debitedAccount: {
          select: {
            Users: {
              select: {
                username: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return transactions;
  }
}

export default TransactionsRepository;
