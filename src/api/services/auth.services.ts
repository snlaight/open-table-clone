import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

import { checkIfUserExists, createUser } from '@/utils/lib/prisma.auth-services';
import { hashPassword, comparePasswords } from '@/utils/lib/bcrypt';
import { generateJWT } from '@/utils/lib/jwt';

export const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, firstName, lastName, phoneNumber, city } = req.body;
  const userExists = await checkIfUserExists(email);

  if (userExists) {
    return res.status(400).json({ errors: [{ message: 'User already exists.' }] });
  }
  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    email,
    password: hashedPassword,
    first_name: firstName,
    last_name: lastName,
    phone: phoneNumber,
    city,
  });

  if (!user) {
    return res.status(400).json({ errors: [{ message: 'Something went wrong creating user.' }] });
  }

  const token = await generateJWT(user);
  setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

  return res.status(200).json({ message: 'User successfully created.',
    data: {
      user,
    } });
};

export const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await checkIfUserExists(email);

  if (!user) {
    return res.status(400).json({ errors: [{ message: 'User does not exist.' }] });
  }
  const passwordMatch = user.password ? await comparePasswords(password, user.password) : false;

  if (!passwordMatch) {
    return res.status(400).json({ errors: [{ message: 'Password is not correct.' }] });
  }

  const token = await generateJWT(user);
  setCookie('jwt', token, { req, res, maxAge: 60 * 6 * 24 });

  return res.status(200).json({ message: 'Signed in successfully.',
    data: {
      user,
    } });
};

export const me = async (req: NextApiRequest, res: NextApiResponse) => {
  const bearerToken = req.headers.authorization as string;

  const token = bearerToken.split(' ')[1];

  const decodedToken = jwt.decode(token) as {email: string};

  const user = await checkIfUserExists(decodedToken.email, {
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    city: true,
    phone: true,
  });

  if (!user) {
    return res.status(400).json({ errors: [{ message: 'User does not exist.' }] });
  }

  return res.status(200).json({ message: 'User found.',
    data: {
      user,
    } });
};
