import { Router } from 'express';
import auth from '../../middlewares/auth';
import ITransactionsController from './interfaces/ITransactionsController';
import TransactionsMiddleware from './TransactionsMiddleware';

class TransactionsRoutes {
  private _controller: ITransactionsController;
  private _route: Router;
  private _middleware: TransactionsMiddleware;

  constructor(
    router: Router,
    controller: ITransactionsController,
    middleware: TransactionsMiddleware) {
    this._controller = controller;
    this._route = router;
    this._middleware = middleware;

    this._route.get('/', auth, this._controller.getAllTransactionByAccountId);

    this._route.get(
      '/filter',
      auth,
      this._middleware.validateFilters,
      this._controller.filterTransactions,
    );
  }

  public get routes() {
    return this._route;
  }
}

export default TransactionsRoutes;
