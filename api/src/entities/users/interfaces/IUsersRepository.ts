import { IUsers, IUsersAccountId, IUsersId } from './IUsers';

interface IUsersRepository {
  getUserByUsername(email: string): Promise<IUsersAccountId | null>
  createUser({ password, username }: IUsers): Promise<IUsersAccountId>
}

export default IUsersRepository;
