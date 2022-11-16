import { Router } from 'express';
import Joi from 'joi';
import OrmInjection from '../class/OrmInjection';
import AccountsController from './accounts/AccountsController';
import AccountsRepository from './accounts/AccountsRepository';
import AccountsRoutes from './accounts/AccountsRoutes.';
import AccountsService from './accounts/AccountsService';
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
    const service = new AccountsService(repository);
    const controller = new AccountsController(service);
    const router = new AccountsRoutes(Router(), controller);

    return router.routes;
  }
}

export default Factory;
