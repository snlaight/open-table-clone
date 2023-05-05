/* eslint-disable consistent-return */
import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthValidationRules, SignInValidationRules } from '@/utils/validators';
import { validateRequestBody } from '@/utils/lib/validateRequest';
import { createAccount, signIn, me } from '@/api/services/auth.services';

export const handleSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  const validationErrors = validateRequestBody(req, AuthValidationRules);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: [validationErrors] });
  }
  await createAccount(req, res);
};

export const handleSignIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const validationErrors = validateRequestBody(req, SignInValidationRules);
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: [validationErrors] });
  }

  await signIn(req, res);
};

export const handleMe = async (req: NextApiRequest, res: NextApiResponse) => {
  await me(req, res);
};
