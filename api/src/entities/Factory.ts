import { Router } from 'express';
import Joi from 'joi';
import prisma from '../database/prisma';
import AccountsController from './accounts/AccountsController';
import AccountsMiddleware from './accounts/AccountsMiddleware';
import AccountsRepository from './accounts/AccountsRepository';
import AccountsRoutes from './accounts/AccountsRoutes.';
import AccountsSchema from './accounts/AccountsSchema';
import AccountsService from './accounts/AccountsService';
import TransactionsController from './transactions/TransactionsController';
import TransactionsMiddleware from './transactions/TransactionsMiddleware';
import TransactionsRepository from './transactions/TransactionsRepository';
import TransactionsRoutes from './transactions/TransactionsRoutes';
import TransactionsSchemas from './transactions/TransactionsSchemas';
import TransactionsService from './transactions/TransactionsService';
import UsersMiddleware from './users/UserMiddleware';
import UsersController from './users/UsersController';
import UsersRepository from './users/UsersRepository';
import UsersRoutes from './users/UsersRoutes';
import UsersSchema from './users/UsersSchemas';
import UsersService from './users/UsersService';

class Factory {
  public static get userRouter() {
    const repository = new UsersRepository(prisma);
    const service = new UsersService(repository);
    const controller = new UsersController(service);
    const schemas = new UsersSchema(Joi);
    const middleware = new UsersMiddleware(schemas);
    const router = new UsersRoutes(Router(), controller, middleware);

    return router.routes;
  }

  public static get accountsRouter() {
    const repository = new AccountsRepository(prisma);
    const transactionRepository = new TransactionsRepository(prisma);
    const userRepository = new UsersRepository(prisma);
    const service = new AccountsService(repository, userRepository, transactionRepository);
    const controller = new AccountsController(service);
    const schemas = new AccountsSchema(Joi);
    const middleware = new AccountsMiddleware(schemas);
    const router = new AccountsRoutes(Router(), controller, middleware);

    return router.routes;
  }

  public static get transactionsRouter() {
    const repository = new TransactionsRepository(prisma);
    const service = new TransactionsService(repository);
    const controller = new TransactionsController(service);
    const schemas = new TransactionsSchemas(Joi);
    const middleware = new TransactionsMiddleware(schemas);
    const router = new TransactionsRoutes(Router(), controller, middleware);

    return router.routes;
  }
}

export default Factory;
