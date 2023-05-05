import type { NextApiRequest, NextApiResponse } from 'next';

import { RouteHandler } from '@/api/handlers';
import { getAvailability } from '@/api/services/availability.services';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await RouteHandler(req, res, {
    GET: getAvailability,
  });
};
