import { prisma } from 'lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const obj = Object.fromEntries(searchParams.entries());
  const users = await prisma.user.findMany({
    where: {
      shopId: Number(obj.shopId) as any,
    },
  });
  return NextResponse.json({ data: users });
}
