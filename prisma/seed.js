/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
const { PrismaClient } = require('@prisma/client');
const { shops, users } = require('./data.js');

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.shop.deleteMany();

    await prisma.session.deleteMany();

    await prisma.user.deleteMany();

    await prisma.$queryRaw`ALTER TABLE shop AUTO_INCREMENT = 1`;

    await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;

    await prisma.shop.createMany({
      data: shops,
    });

    await prisma.user.createMany({
      data: users,
    });
  } catch (e) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
