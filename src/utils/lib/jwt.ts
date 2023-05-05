import { NextResponse } from 'next/server';
import * as jose from 'jose';

import { algorithm, JWT_SECRET } from '@/utils/constants';

export const generateJWT = async (payload: any) => {
  const token = await new jose.SignJWT(payload).setProtectedHeader({ alg: algorithm }).setExpirationTime('24h').sign(JWT_SECRET);

  return token;
};

export const decodeJWT = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET.toString());
  try {
    await jose.jwtVerify(token, secret);
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized request.', error: err }),
      { status: 401 },
    );
  }
};
