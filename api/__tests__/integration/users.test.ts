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
    })
  })
})
