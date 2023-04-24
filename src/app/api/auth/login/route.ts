import * as bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import type { NextRequest } from 'next/dist/server/web/spec-extension/request';
import { NextResponse } from 'next/server';

import {
  createSession,
  findUniqueSession,
  findUniqueUser,
  signTokens,
} from '@/services/user.service';
import { accessTokenExpiresIn } from '@/utils/constants';

export async function POST(req: NextRequest) {
  try {
    const reqObj = await req.json();
    const { email, password } = reqObj;
    const user = await findUniqueUser(
      { email: email.toLowerCase() },
      { id: true, name: true, email: true, password: true }
    );
    const passwordValidation = await bcrypt.compare(password, user.password);
    if (!user || !passwordValidation) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'Invalid email or password',
        }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    const { accessToken } = await signTokens({
      name: user.name,
      email: user.email,
    });

    const sessionSearch = await findUniqueSession({ userId: user.id });

    const expirationString = Date.now() + accessTokenExpiresIn;
    const expirationDate = new Date(expirationString);
    if (!sessionSearch) {
      await createSession({
        shopId: 1,
        userId: user.id,
        expiresAt: expirationDate,
      });
    }

    const serialized = serialize('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: accessTokenExpiresIn, // 30 days expiration,
      path: '/',
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: 'Successful log in' }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'Set-Cookie': serialized,
        },
      }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Server Error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
