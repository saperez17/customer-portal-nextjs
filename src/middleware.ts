// import { NextResponse } from 'next/server';
import type { NextApiRequest } from 'next';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { AnyZodObject } from 'zod';
import { ZodError } from 'zod';

export const validate = (schema: AnyZodObject, req: NextApiRequest) => {
  try {
    schema.parse({
      query: req.query,
      body: req.body,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'authentication failed' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  return null;
};

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const jwt = request.cookies.get('accessToken');

  if (request.nextUrl.pathname.includes('/account')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('/app/login', request.url));
    }
  }
  return res;
  // const res = NextResponse.next();
  // console.log('here');
  // validate(loginUserSchema, request);
  // return res;
}

// export const config = {
//   matcher: '/api/auth/login',
// };
