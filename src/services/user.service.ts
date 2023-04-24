import type { Prisma, Session, Shop, User } from '@prisma/client';
import { prisma } from 'lib/prisma';

import { accessTokenExpiresIn, refreshTokenExpiresIn } from '@/utils/constants';
import { signJwt } from '@/utils/jwt';

export const excludedFields = ['password'];

export const createUser = async (input: Prisma.UserCreateInput) => {
  return (await prisma.user.create({
    data: input,
  })) as User;
};

export const createSession = async (input: any) => {
  return (await prisma.session.create({
    data: input,
  })) as Session;
};

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect
) => {
  return (await prisma.user.findUnique({
    where,
    select,
  })) as User;
};

export const findManyShops = async (
  where: Prisma.ShopWhereInput,
  select?: Prisma.ShopSelect
) => {
  return (await prisma.shop.findMany({
    where,
    select,
  })) as Shop[];
};

export const findUniqueSession = async (
  where: Prisma.SessionWhereUniqueInput,
  select?: Prisma.SessionSelect
) => {
  return (await prisma.session.findUnique({
    where,
    select,
  })) as Session;
};

export const deleteUniqueSession = async (
  where: Prisma.SessionWhereUniqueInput
) => {
  return (await prisma.session.delete({
    where,
  })) as Session;
};

export const signTokens = async (user: Partial<Prisma.UserCreateInput>) => {
  // // 1. Create Session
  // redisClient.set(`${user.id}`, JSON.stringify(user), {
  //   EX: config.get<number>('redisCacheExpiresIn') * 60,
  // });

  // 2. Create Access and Refresh tokens
  const accessToken = signJwt({ user }, 'accessTokenPrivateKey', {
    expiresIn: `${accessTokenExpiresIn}m`,
  });
  const refreshToken = signJwt({ user }, 'refreshTokenPrivateKey', {
    expiresIn: `${refreshTokenExpiresIn}m`,
  });

  return { accessToken, refreshToken };
};
