import { PrismaClient } from '@prisma/client';
import { ITransactionsFilterRepo } from './interfaces/ITransactionsFilter';
import ITransactionsRepository from './interfaces/ITransactionsRepository';

class TransactionsRepository implements ITransactionsRepository {
  private _prisma: PrismaClient;
  private includeUser = {
    include: {
      creditedAccount: { select: { Users: { select: { username: true, id: true } } } },
      debitedAccount: { select: { Users: { select: { username: true, id: true } } } },
    },
  };

  constructor(orm: PrismaClient) {
    this._prisma = orm;
  }

  public async getAllTransactionByAccountId(accountId: string) {
    const transactions = await this._prisma.transactions.findMany({
      where: {
        OR: [{ creditedAccountId: accountId }, { debitedAccountId: accountId }],
      },
      ...this.includeUser,
    });

    return transactions;
  }

  public async createTransiction(debitedAcctId: string, creditedAccId: string, value: number) {
    const transactionsCreated = await this._prisma.transactions.create({
      data: { creditedAccountId: creditedAccId, debitedAccountId: debitedAcctId, value },
      ...this.includeUser,
    });

    return transactionsCreated;
  }

  public async filterTransactions({ date, debited, credited }: ITransactionsFilterRepo) {
    return this._prisma.transactions.findMany({
      where: {
        OR: [{ creditedAccountId: credited }, { debitedAccountId: debited }],
        createdAt: date === undefined ? undefined : { lte: new Date(`${date}T23:59:59.999Z`), gte: new Date(date) },
      },
      ...this.includeUser,
    });
  }
}

export default TransactionsRepository;
