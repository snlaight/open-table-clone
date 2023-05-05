import type { NextApiRequest, NextApiResponse } from 'next';

import { RouteHandler } from '@/api/handlers';
import { handleSignUp } from '@/api/handlers/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await RouteHandler(req, res, {
    POST: handleSignUp,
  });
};
