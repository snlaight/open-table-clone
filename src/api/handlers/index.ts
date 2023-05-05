/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-return-await */
import type { NextApiRequest, NextApiResponse } from 'next';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type HttpHandler = (req: NextApiRequest, res: NextApiResponse) => void;

interface RouteHandlerParams {
    GET?: HttpHandler;
    POST?: HttpHandler;
    PUT?: HttpHandler;
    DELETE?: HttpHandler;
}

export const RouteHandler = async (req: NextApiRequest, res: NextApiResponse, handlers: RouteHandlerParams) => {
  const method = req.method as HttpMethod;
  const handler = handlers[method];

  if (!handler) {
    return res.status(405).send('Method not allowed');
  }

  return await handler!(req, res);
};
