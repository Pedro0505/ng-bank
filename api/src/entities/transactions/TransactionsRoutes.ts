import { Router } from 'express';
import auth from '../../middlewares/auth';
import ITransactionsController from './interfaces/ITransactionsController';

class TransactionsRoutes {
  private _controller: ITransactionsController;
  private _route: Router;

  constructor(router: Router, controller: ITransactionsController) {
    this._controller = controller;
    this._route = router;

    this._route.get('/', auth, this._controller.getAllTransactionByAccountId);
    this._route.get('/filter', auth, this._controller.filterTransactions);
  }

  public get routes() {
    return this._route;
  }
}

export default TransactionsRoutes;
