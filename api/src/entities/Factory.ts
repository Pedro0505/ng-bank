import { Router } from 'express';
import Joi from 'joi';
import OrmInjection from '../class/OrmInjection';
import AccountsController from './accounts/AccountsController';
import AccountsRepository from './accounts/AccountsRepository';
import AccountsRoutes from './accounts/AccountsRoutes.';
import AccountsService from './accounts/AccountsService';
import TransactionsController from './transactions/TransactionsController';
import TransactionsRepository from './transactions/TransactionsRepository';
import TransactionsRoutes from './transactions/TransactionsRoutes';
import TransactionsService from './transactions/TransactionsService';
import UsersMiddleware from './users/UserMiddleware';
import UsersController from './users/UsersController';
import UsersRepository from './users/UsersRepository';
import UsersRoutes from './users/UsersRoutes';
import UsersSchema from './users/UsersSchemas';
import UsersService from './users/UsersService';

class Factory {
  public static get userRouter() {
    const repository = new UsersRepository(new OrmInjection());
    const service = new UsersService(repository);
    const controller = new UsersController(service);
    const schemas = new UsersSchema(Joi);
    const middleware = new UsersMiddleware(schemas);
    const router = new UsersRoutes(Router(), controller, middleware);

    return router.routes;
  }

  public static get accountsRouter() {
    const repository = new AccountsRepository(new OrmInjection());
    const transactionRepository = new TransactionsRepository(new OrmInjection());
    const userRepository = new UsersRepository(new OrmInjection());
    const service = new AccountsService(repository, userRepository, transactionRepository);
    const controller = new AccountsController(service);
    const router = new AccountsRoutes(Router(), controller);

    return router.routes;
  }

  public static get transactionsRouter() {
    const repository = new TransactionsRepository(new OrmInjection());
    const service = new TransactionsService(repository);
    const controller = new TransactionsController(service);
    const router = new TransactionsRoutes(Router(), controller);

    return router.routes;
  }
}

export default Factory;
