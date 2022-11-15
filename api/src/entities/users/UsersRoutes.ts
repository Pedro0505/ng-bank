import { Router } from 'express';
import IUserController from './interfaces/IUsersController';

class UsersRouter {
  private _controller: IUserController;
  private _route: Router;

  constructor(router: Router, controller: IUserController) {
    this._controller = controller;
    this._route = router;

    this._route.post('/login', this._controller.login);

    this._route.post('/register', this._controller.register);
  }

  public get routes() {
    return this._route;
  }
}

export default UsersRouter;
