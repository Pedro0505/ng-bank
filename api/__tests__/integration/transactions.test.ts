import request from 'supertest';
import { app } from "../../src/api/App";
import prisma from "../../src/database/prisma";
import PathRoutes from "../constants/PathRoutes";
import accounts from "../seeders/accounts";
import transactions from "../seeders/transactions";
import users from "../seeders/users";
import getTransactionsResponse from "../fakeData/getTransactionsResponse";
import filterDateCashInTransaction from '../fakeData/filterDateCashInTransaction';
import filterDateCashOutTransaction from '../fakeData/filterDateCashOutTransaction';
import filterCashInTransaction from '../fakeData/filterCashInTransaction';
import filterCashOutTransaction from '../fakeData/filterCashOutTransaction';
import filterDateTransaction from '../fakeData/filterDateTransaction';

describe('Testing the route /transactions', () => {
  describe('Testing the GET in /transactions', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.accounts.createMany({ data: accounts }),
        prisma.users.createMany({ data: users }),
        prisma.transactions.createMany({ data: transactions }),
      ]);

      const { body } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: '12345678A' });
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.transactions.deleteMany(),
        prisma.users.deleteMany(),
        prisma.accounts.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Testing sucess response', async () => {
      const { body, status } = await request(app).get(PathRoutes.transactionGetByAccountId).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(getTransactionsResponse);
    });

    it('Testing if auth is applicated in route', async () => {
      const { body, status } = await request(app).get(PathRoutes.transactionGetByAccountId);

      expect(status).toBe(401);
      expect(body.error).toBeDefined();
      expect(body.error.message).toBeDefined();
      expect(body).toStrictEqual({ error: { message: 'Token not found' } });
    });
  });

  describe('Testing the GET in /transactions/filter?date=&type=', () => {
    let token: string;

    beforeAll(async () => {
      await prisma.$transaction([
        prisma.accounts.createMany({ data: accounts }),
        prisma.users.createMany({ data: users }),
        prisma.transactions.createMany({ data: transactions }),
      ]);

      const { body } = await request(app).post(PathRoutes.userLogin).send({ username: 'jonh_doe', password: '12345678A' });
      token = body.token;
    });

    afterAll(async () => {
      await prisma.$transaction([
        prisma.transactions.deleteMany(),
        prisma.users.deleteMany(),
        prisma.accounts.deleteMany(),
      ]);

      await prisma.$disconnect();
    });

    it('Testing sucess response with "date=2022-11-17" and "type=cashIn"', async () => {
      const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-11-17&type=cashIn`).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(filterDateCashInTransaction);
    });

    it('Testing sucess response with "date=2022-11-17" and "type=cashOut"', async () => {
      const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-11-17&type=cashOut`).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(filterDateCashOutTransaction);
    });

    it('Testing sucess response with "date=2022-11-17"', async () => {
      const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-11-17`).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(filterDateTransaction);
    });

    it('Testing sucess response with "type=cashOut"', async () => {
      const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-11-17&type=cashOut`).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(filterCashOutTransaction);
    });

    it('Testing sucess response with "type=cashIn"', async () => {
      const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-11-17&type=cashIn`).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toStrictEqual(filterCashInTransaction);
    });

    describe('Testing errors in /transactions', () => {
      it('Testing error when query is not send to filter', async () => {
        const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}`).set('Authorization', token);
  
        expect(status).toBe(400);
                expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: 'Need a last one query filter \"date\" or \"type\"' } });
      });

      it('Testing error when "date" have a incorrect format', async () => {
        const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-41-21&type=cashIn`).set('Authorization', token);
  
        expect(status).toBe(400);
                expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"date\" is invalid date format must be yyyy-mm-dd' } });
      });

      it('Testing error when type is not "cashIn" or "cashOut"', async () => {
        const { body, status } = await request(app).get(`${PathRoutes.transactionFilters}?date=2022-11-17&type=cashUp`).set('Authorization', token);
  
        expect(status).toBe(400);
                expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"type\" must be "cashIn" or \"cashOut\"' } });
      });
    });
  });
});
