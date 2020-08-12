import { IncomingHttpHeaders } from 'http';
import { RequestHandler } from 'express';
import cors from 'cors';

import { corsConfig } from '../config';
import { isGooglebot } from '../utils';
import { logger } from '../components';

const isWhitelisted = ({ origin }: IncomingHttpHeaders): boolean => {
  const { whitelist } = corsConfig;
  return !!origin && !!whitelist.length && whitelist.includes(origin);
};

export const middleware = (): RequestHandler =>
  cors(async (req, cb) => {
    const { headers } = req;

    if (isWhitelisted(headers) || (await isGooglebot(headers))) {
      return cb(null, { origin: true });
    }

    logger.debug('middleware(cors):', { headers });

    return cb(new Error('CORS'), { origin: false });
  });
