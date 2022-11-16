import { Router } from 'express';
import auth from '../../middlewares/auth';
import IAccountsController from './interfaces/IAccountsController';

class AccountsRoutes {
  private _controller: IAccountsController;
  private _route: Router;

  constructor(router: Router, controller: IAccountsController) {
    this._controller = controller;
    this._route = router;

    this._route.get('/', auth, this._controller.getBalanceByUserId);

    this._route.put('/cashOut', auth, this._controller.cashOut);
  }

  public get routes() {
    return this._route;
  }
}

export default AccountsRoutes;
