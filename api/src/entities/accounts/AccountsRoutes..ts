import { Router } from 'express';
import auth from '../../middlewares/auth';
import AccountsMiddleware from './AccountsMiddleware';
import IAccountsController from './interfaces/IAccountsController';

class AccountsRoutes {
  private _controller: IAccountsController;
  private _middleware: AccountsMiddleware;
  private _route: Router;

  constructor(router: Router, controller: IAccountsController, middleware: AccountsMiddleware) {
    this._controller = controller;
    this._route = router;
    this._middleware = middleware;

    this._route.get('/', auth, this._controller.getBalanceByUserId);

    this._route.put(
      '/cashOut',
      auth,
      this._middleware.cashOut,
      this._controller.cashOut,
    );
  }

  public get routes() {
    return this._route;
  }
}

export default AccountsRoutes;
