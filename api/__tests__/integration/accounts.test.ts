import request from 'supertest';
import { app } from '../../src/api/App';
import prisma from '../../src/database/prisma';
import accounts from '../seeders/accounts';
import transactions from '../seeders/transactions';
import users from '../seeders/users';
import PathRoutes from '../constants/PathRoutes';

describe('Testing the route /accounts', () => {
  describe('Testing the GET /accounts', () => {
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
      const { body, status } = await request(app).get(PathRoutes.accountsGetBalanceById).set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data).toBeDefined();
      expect(body).toStrictEqual({ data: { id: 'd4258e37-e297-45f1-9bcd-487a65f93bfb', balance: 120 } });
    });

    it('Testing if auth is applicated in route', async () => {
      const { body, status } = await request(app).get(PathRoutes.accountsGetBalanceById);

      expect(status).toBe(401);
      expect(body.error).toBeDefined();
      expect(body.error.message).toBeDefined();
      expect(body).toStrictEqual({ error: { message: 'Token not found' } });
    });
  });

  describe('Testing the GET /accounts/cashOut', () => {
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

    it('Testing when response is sucess', async () => {
      const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "pedro_henrique", value: 20 })
        .set('Authorization', token);

      expect(status).toBe(200);
      expect(body.data.debitedAccountId).toBe('d4258e37-e297-45f1-9bcd-487a65f93bfb');
      expect(body.data.creditedAccountId).toBe('fd06d274-75ba-475e-91db-813876fe58fa');
      expect(body.data.value).toBe(20);

      const { body: account } = await request(app).get(PathRoutes.accountsGetBalanceById).set('Authorization', token);

      expect(account.data.balance).toBe(100);
    });

    describe('Testing errors in route', () => {
      it('Testing when is send a user in "creditedUsername" that not exist', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "im_not_exist", value: 20 })
        .set('Authorization', token);

        expect(status).toBe(404);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: 'User not found' } });
      });

      it('Testing when is send a "value" greater than the user who is sending it has in the account', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "pedro_henrique", value: 1000000 })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: 'Balance is not enough' } });
      });

      it('Testing when "creditedUsername" is not send', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ value: 20 })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"creditedUsername\" is required' } });
      });

      it('Testing when the "creditedUsername" is send with less than 3 of length', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "im", value: 20 })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"creditedUsername\" it has to be greater than 2' } });
      });

      it('Testing when the "value" is not send', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "pedro_henrique" })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"value\" is required' } });
      });
      
      it('Testing when the "value" is send but is not a number', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "pedro_henrique", value: "20" })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"value\" must be a number' } });
      });

      it('Testing try transfer to yourself', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "jonh_doe", value: 20 })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: 'You cannot transfer to your own account' } });
      });

      it('Testing when send a "value" with more than two decimal places', async () => {
        const { body, status } = await request(app)
        .put(PathRoutes.accountsCashOut)
        .send({ creditedUsername: "pedro_henrique", value: 20.222 })
        .set('Authorization', token);

        expect(status).toBe(400);
        expect(body.error).toBeDefined();
        expect(body.error.message).toBeDefined();
        expect(body).toStrictEqual({ error: { message: '\"value\" must have one or two decimal places' } });
      });
    });
  });
});
