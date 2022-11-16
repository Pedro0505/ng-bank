import { IUsers, IUsersAccountId, IUsersId } from './IUsers';

interface IUsersRepository {
  getUserByUsername(username: string): Promise<IUsersAccountId | null>
  createUser({ password, username }: IUsers): Promise<IUsersAccountId>
}

export default IUsersRepository;
