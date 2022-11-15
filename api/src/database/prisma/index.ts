import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const ENV = process.env.NODE_ENV || 'dev';

const DB_URLS = {
  test: process.env.DATABASE_URL_TEST,
  dev: process.env.DATABASE_URL,
};

const url = DB_URLS[ENV as keyof typeof DB_URLS];

const prisma = new PrismaClient({ datasources: { db: { url } } });

export default prisma;
