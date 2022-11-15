import prisma from '../prisma/index';
import accounts from './data/accounts';
import transactions from './data/transactions';
import users from './data/users';

async function main() {
  await prisma.accounts.createMany({ data: accounts });
  await prisma.users.createMany({ data: users });
  await prisma.transactions.createMany({ data: transactions });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
