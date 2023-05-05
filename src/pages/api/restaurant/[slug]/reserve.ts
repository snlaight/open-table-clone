import type { NextApiRequest, NextApiResponse } from 'next';

import { RouteHandler } from '@/api/handlers';
import { handleReserve } from '@/api/services/reserve.services';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await RouteHandler(req, res, {
    POST: handleReserve,
  });
};
