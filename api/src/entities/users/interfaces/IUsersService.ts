import ConflictError from '../../../utils/http_responses/ConflictError';
import NotFoundError from '../../../utils/http_responses/NotFoundError';
import UnauthorizedError from '../../../utils/http_responses/UnauthorizedError';

interface IUserService {
  login(username: string, password: string): Promise<string | UnauthorizedError>;
  register(username: string, password: string): Promise<string | ConflictError>;
}

export default IUserService;
