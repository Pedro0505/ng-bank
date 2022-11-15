import { Router } from 'express';
import OrmInjection from '../class/OrmInjection';
import UsersController from './users/UsersController';
import UsersRepository from './users/UsersRepository';
import UsersRouter from './users/UsersRoutes';
import UsersService from './users/UsersService';

class Factory {
  public static get userRouter() {
    const repository = new UsersRepository(new OrmInjection());
    const service = new UsersService(repository);
    const controller = new UsersController(service);
    const router = new UsersRouter(Router(), controller);

    return router.routes;
  }
}

export default Factory;
