import Encrypt from '../../utils/Encrypt';
import ConflictError from '../../utils/http_responses/ConflictError';
import UnauthorizedError from '../../utils/http_responses/UnauthorizedError';
import Jwt from '../../utils/Jwt';
import IUsersRepository from './interfaces/IUsersRepository';
import IUsersService from './interfaces/IUsersService';

class UsersService implements IUsersService {
  private _repository: IUsersRepository;

  constructor(repository: IUsersRepository) {
    this._repository = repository;
  }

  public async login(username: string, password: string) {
    const user = await this._repository.getUserByUsername(username);

    if (!user) return new UnauthorizedError('Username or password incorrect');

    const verify = await new Encrypt().bcryptVerify(password, user.password);

    if (!verify) return new UnauthorizedError('Username or password incorrect');

    const token = new Jwt().generate({
      username: user.username, userId: user.id, accountId: user.accountId,
    });

    return token;
  }

  public async register(username: string, password: string) {
    const user = await this._repository.getUserByUsername(username);

    if (user) return new ConflictError('Email already registered');

    const hash = await new Encrypt().bcryptEncrypt(password);

    const created = await this._repository.createUser({ password: hash, username });

    const token = new Jwt().generate({
      username: created.username, userId: created.id, accountId: created.accountId,
    });

    return token;
  }
}

export default UsersService;
