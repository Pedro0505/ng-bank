import { Router } from 'express';
import Joi from 'joi';
import OrmInjection from '../class/OrmInjection';
import UsersMiddleware from './users/UserMiddleware';
import UsersController from './users/UsersController';
import UsersRepository from './users/UsersRepository';
import UsersRouter from './users/UsersRoutes';
import UsersSchema from './users/UsersSchemas';
import UsersService from './users/UsersService';

class Factory {
  public static get userRouter() {
    const repository = new UsersRepository(new OrmInjection());
    const service = new UsersService(repository);
    const controller = new UsersController(service);
    const schemas = new UsersSchema(Joi);
    const middleware = new UsersMiddleware(schemas);
    const router = new UsersRouter(Router(), controller, middleware);

    return router.routes;
  }
}

export default Factory;
