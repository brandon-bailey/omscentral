import cors from 'cors';
import { RequestHandler } from 'express';
import { IncomingHttpHeaders } from 'http';

import { logger } from '../components';
import { corsConfig } from '../config';
import { isGooglebot } from '../utils';

const isWhitelisted = ({ origin }: IncomingHttpHeaders): boolean => {
  const { whitelist } = corsConfig;
  if (!whitelist.length) {
    return true;
  }

  return !!origin && whitelist.includes(origin);
};

export const middleware = (): RequestHandler =>
  cors(async (req, cb) => {
    const { headers } = req;

    if (
      req.method === 'OPTIONS' ||
      isWhitelisted(headers) ||
      (await isGooglebot(headers))
    ) {
      return cb(null, { origin: true });
    }

    logger.debug('middleware(cors):', { headers });

    return cb(new Error('CORS'), { origin: false });
  });
