import { serialize } from 'cookie';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { deleteUniqueSession } from '@/services/user.service';
import { verifyJwt } from '@/utils/jwt';

type DecodedToken = {
  id: number;
  name: string;
  email: string;
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
      const user = verifyJwt<DecodedToken>(accessToken, 'accessTokenPublicKey');
      if (!user) {
        return new NextResponse(
          JSON.stringify({ success: false, error: 'Invalid Token' }),
          {
            status: 404,
            headers: {
              'content-type': 'application/json',
            },
          }
        );
      }
      deleteUniqueSession({
        userId: user.id,
      });

      const serialized = serialize('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
      });

      return new NextResponse(
        JSON.stringify({ success: true, message: 'Successful log out' }),
        {
          status: 200,
          headers: {
            'content-type': 'application/json',
            'Set-Cookie': serialized,
          },
        }
      );
    } catch (e) {
      return new NextResponse(
        JSON.stringify({ success: true, error: 'error validating token' }),
        {
          status: 500,
          headers: {
            'content-type': 'application/json',
          },
        }
      );
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: true, error: 'Server Error' }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
}
