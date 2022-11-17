import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../src/api/App';
import prisma from '../../src/database/prisma';
import accounts from '../seeders/accounts';
import users from '../seeders/users';
import transactions from '../seeders/transactions';
import PathRoutes from '../constants/PathRoutes';

describe('Testing the /user', () => {
  describe('Testing the route POST /login', () => {
    beforeAll(async () => {
      await prisma.$transaction([
        prisma.accounts.createMany({ data: accounts }),
        prisma.users.createMany({ data: users }),
        prisma.transactions.createMany({ data: transactions }),
      ]);
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.transactions.deleteMany(),
        prisma.users.deleteMany(),
        prisma.accounts.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Testing the great response of /login', async () => {
      const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: '12345678A' });

      expect(status).toBe(200);
      expect(body.token).toBeDefined();
      expect(() => { jwt.verify(body.token, process.env.JWT_SECRET as string) }).not.toThrow();
    });

    describe('Testing when have an error', () => {
      it('Testing when the username is not found', async () => {
        const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'who_im', password: '12345678A' });

        expect(status).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body.error.message).toBe('Username or password incorrect');
      });

      it('Testing when the username is correct but the password is incorrect', async () => {
        const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: 'Imwrong123' });

        expect(status).toBe(401);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body.error.message).toBe('Username or password incorrect');
      });

      describe('Testing the filed "username" errors', () => {
        it('When the "username" is not send', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ password: 'imwrong' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Username\" is required');
        });

        it('When the "username" is send with less than 3 of length', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'im', password: 'imwrong' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Username\" it has to be greater than 2');
        });
      });

      describe('Testing the filed "password" errors', () => {
        it('When the "password" is not send', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" is required');
        });

        it('When the "password" is send with less than 8 of length', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: '12AD' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it has to be greater than 7');
        });

        it('When the "password" is send without at least one number', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: 'Jonhdoepass' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it\'s must have at least one capital letter and one number');
        });

        it('When the "password" is send without at least capital letter', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: 'jonhdoe123' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it\'s must have at least one capital letter and one number');
        });

        it('When the "password" is send without at least one number and capital letter', async () => {
          const { body, status } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: 'jonhdoepass' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it\'s must have at least one capital letter and one number');
        });
      });
    });
  });

  describe('Testing the route POST /register', () => {
    beforeAll(async () => {
      await prisma.$transaction([
        prisma.accounts.createMany({ data: accounts }),
        prisma.users.createMany({ data: users }),
        prisma.transactions.createMany({ data: transactions }),
      ]);
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.transactions.deleteMany(),
        prisma.users.deleteMany(),
        prisma.accounts.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Testing the great response of /register', async () => {
      const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'new_jonh_doe', password: '12345678A' });

      expect(status).toBe(201);
      expect(body.token).toBeDefined();
      expect(() => { jwt.verify(body.token, process.env.JWT_SECRET as string) }).not.toThrow();
    });

    describe('Testing when have an error', () => {
      it('Testing when the username already exist', async () => {
        const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'new_jonh_doe', password: '12345678A' });

        expect(status).toBe(409);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body.error.message).toBe('Username already registered');
      });

      describe('Testing the filed "username" errors', () => {
        it('When the "username" is not send', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ password: 'imwrong' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Username\" is required');
        });

        it('When the "username" is send with less than 3 of length', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'im', password: 'imwrong' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Username\" it has to be greater than 2');
        });
      });

      describe('Testing the filed "password" errors', () => {
        it('When the "password" is not send', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'jonh_doe' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" is required');
        });

        it('When the "password" is send with less than 8 of length', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'jonh_doe', password: '12AD' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it has to be greater than 7');
        });

        it('When the "password" is send without at least one number', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'jonh_doe', password: 'Jonhdoepass' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it\'s must have at least one capital letter and one number');
        });

        it('When the "password" is send without at least capital letter', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'jonh_doe', password: 'jonhdoe123' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it\'s must have at least one capital letter and one number');
        });

        it('When the "password" is send without at least one number and capital letter', async () => {
          const { body, status } = await request(app).post(PathRoutes.userRegister).send({ username: 'jonh_doe', password: 'jonhdoepass' });

          expect(status).toBe(400);
          expect(body.error).toBeDefined();
          expect(body.error.message).toBeDefined();
          expect(body.error.message).toBe('\"Password\" it\'s must have at least one capital letter and one number');
        });
      });
    });
  });
});
