import * as bcrypt from 'bcryptjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createUser } from '@/services/user.service';

export async function POST(req: NextRequest) {
  try {
    const reqObj = await req.json();
    const hashedPassword = await bcrypt.hash(reqObj.password, 12);
    const user = await createUser({
      name: reqObj.name,
      email: reqObj.email.toLowerCase(),
      password: hashedPassword,
    });

    const { name, email, shopId } = user;
    const newUser = {
      name,
      email,
      shopId,
    };

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Successful Signup',
        data: {
          user: newUser,
        },
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Server Error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
