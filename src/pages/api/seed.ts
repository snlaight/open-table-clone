import type { NextApiRequest, NextApiResponse } from 'next';

import { RouteHandler } from '@/api/handlers';
import SeedDB from '@/api/handlers/seed';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await RouteHandler(req, res, {
    GET: SeedDB,
  });
};

export default handler;
