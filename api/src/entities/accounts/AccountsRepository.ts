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
}

export default AccountsRepository;
