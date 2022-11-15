import OrmInjection from '../../class/OrmInjection';
import { IUsers } from './interfaces/IUsers';
import IUsersRepository from './interfaces/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private _prisma: OrmInjection;

  constructor(orm: OrmInjection) {
    this._prisma = orm;
  }

  public async createUser({ password, username }: IUsers) {
    const account = await this._prisma.accounts.create({ data: { balance: 100.00 } });

    const created = await this._prisma.users.create({
      data: { password, username, accountId: account.id },
    });

    return created;
  }

  public async getUserByUsername(username: string) {
    const user = await this._prisma.users.findFirst({ where: { username } });

    return user;
  }
}

export default UsersRepository;
