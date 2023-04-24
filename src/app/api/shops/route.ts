import { NextResponse } from 'next/server';

import { findManyShops } from '@/services/user.service';

export async function GET() {
  const shops = await findManyShops(
    {},
    {
      shopName: true,
      shopUrl: true,
      createdAt: true,
      membershipLevel: true,
    }
  );
  return new NextResponse(
    JSON.stringify({
      success: false,
      data: shops,
    }),
    {
      status: 200,
    }
  );
}
