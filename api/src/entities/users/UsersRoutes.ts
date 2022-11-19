import { Router } from 'express';
import auth from '../../middlewares/auth';
import IUserController from './interfaces/IUsersController';
import UsersMiddleware from './UserMiddleware';

class UsersRoutes {
  private _controller: IUserController;
  private _route: Router;
  private _middleware: UsersMiddleware;

  constructor(router: Router, controller: IUserController, middleware: UsersMiddleware) {
    this._controller = controller;
    this._route = router;
    this._middleware = middleware;

    this._route.post('/login', this._middleware.loginValidate, this._controller.login);

    this._route.post('/register', this._middleware.registerValidate, this._controller.register);

    this._route.get('/verify', auth, (req, res) => res.status(200).json({ data: req.tokenData }));
  }

  public get routes() {
    return this._route;
  }
}

export default UsersRoutes;
