import OrmInjection from '../../class/OrmInjection';
import IAccountsRepository from './interfaces/IAccountsRepository';

class AccountsRepository implements IAccountsRepository {
  private _prisma: OrmInjection;

  constructor(orm: OrmInjection) {
    this._prisma = orm;
  }

  public async getBalanceByUserId(id: string) {
    const account = await this._prisma.accounts.findFirst({ where: { id } });

    return account;
  }

  public async chashOut(debitedAccountId: string, creditedAccountId: string, value: number) {
    const debitedAcc = await this._prisma.accounts.findFirst({ where: { id: debitedAccountId } });
    const creditedAcc = await this._prisma.accounts.findFirst({ where: { id: creditedAccountId } });

    if (!debitedAcc || !creditedAcc) {
      return null;
    }

    const updatedDebitedAcc = this._prisma.accounts.update({
      where: {
        id: debitedAccountId,
      },
      data: {
        balance: debitedAcc.balance - value,
      },
    });

    const updatedCreditedAcc = this._prisma.accounts.update({
      where: {
        id: creditedAccountId,
      },
      data: {
        balance: creditedAcc.balance + value,
      },
    });

    const [deb, cred] = await this._prisma.$transaction([updatedDebitedAcc, updatedCreditedAcc]);

    return {
      debited: deb,
      credited: cred,
    };
  }
}

export default AccountsRepository;
