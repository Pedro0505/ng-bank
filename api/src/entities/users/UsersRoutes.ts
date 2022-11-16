import { Router } from 'express';
import IUserController from './interfaces/IUsersController';
import UsersMiddleware from './UserMiddleware';

class UsersRouter {
  private _controller: IUserController;
  private _route: Router;
  private _middleware: UsersMiddleware;

  constructor(router: Router, controller: IUserController, middleware: UsersMiddleware) {
    this._controller = controller;
    this._route = router;
    this._middleware = middleware;

    this._route.post('/login', this._middleware.loginValidate, this._controller.login);

    this._route.post('/register', this._middleware.registerValidate, this._controller.register);
  }

  public get routes() {
    return this._route;
  }
}

export default UsersRouter;
