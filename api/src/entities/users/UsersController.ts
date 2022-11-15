import { Request, Response } from 'express';
import BadRequest from '../../utils/http_responses/class/BadRequest';
import IUserController from './interfaces/IUsersController';
import IUserService from './interfaces/IUsersService';

class UsersController implements IUserController {
  private _service: IUserService;

  constructor(service: IUserService) {
    this._service = service;
  }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const service = await this._service.login(username, password);

    if (service instanceof BadRequest) {
      const { reponse: { code, error } } = service;
      return res.status(code).json({ error });
    }

    return res.status(200).json({ token: service });
  };

  public register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const service = await this._service.register(username, password);

    if (service instanceof BadRequest) {
      const { reponse: { code, error } } = service;
      return res.status(code).json({ error });
    }

    return res.status(200).json({ token: service });
  };
}

export default UsersController;
