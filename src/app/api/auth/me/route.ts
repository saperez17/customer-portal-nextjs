import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { findUniqueUser } from '@/services/user.service';
import { verifyJwt } from '@/utils/jwt';

type DecodedToken = {
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;
    if (!accessToken) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'no token' }),
        {
          status: 401,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    }
    try {
      const decodedToken = verifyJwt<DecodedToken>(
        accessToken,
        'accessTokenPublicKey'
      );
      if (!decodedToken) {
        return new NextResponse(
          JSON.stringify({ success: false, message: 'Invalid Token' }),
          {
            status: 404,
          }
        );
      }
      const user = await findUniqueUser(
        { email: decodedToken.user.email.toLowerCase() },
        {
          id: true,
          name: true,
          email: true,
          password: false,
        }
      );

      return new NextResponse(
        JSON.stringify({
          success: false,
          ...user,
        }),
        {
          status: 200,
        }
      );
    } catch (e) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'error validating token',
        }),
        {
          status: 500,
        }
      );
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Server Error',
      }),
      {
        status: 500,
      }
    );
  }
}
