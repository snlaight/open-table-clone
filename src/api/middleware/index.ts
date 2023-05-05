import { NextRequest, NextResponse } from 'next/server';

import { decodeJWT } from '@/utils/lib/jwt';

export async function middleware(req:NextRequest) {
  const bearerToken = req.headers.get('authorization') as string;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized request.' }),
    );
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ error: 'No token provided.' }),
      { status: 401 },
    );
  }

  const decodedToken = await decodeJWT(token);

  if (decodedToken instanceof NextResponse) {
    return decodedToken;
  }

  return null;
}
