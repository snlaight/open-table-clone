import prisma from '@/utils/prisma';

import { comparePasswords } from '@/utils/lib/bcrypt';
import { SelectItems } from '@/utils/interfaces';

const selectItems = {
  id: true,
  email: true,
  first_name: true,
  last_name: true,
  phone: true,
  city: true,
  password: true,
};

export const checkIfUserExists = async (email: string, select?: Partial<SelectItems>) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
    select: select || selectItems,
  });

  return userExists;
};

export const createUser = async (data: any) => {
  const user = await prisma.user.create({
    data,
  });

  return user;
};

export const checkUserWithPassword = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return false;
  }

  const passwordMatch = await comparePasswords(password, user.password);

  if (!passwordMatch) {
    return false;
  }

  return user;
};
