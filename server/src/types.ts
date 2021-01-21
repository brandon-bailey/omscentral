import { Request as BaseRequest, Response } from 'express';
import { Logger } from 'winston';

import { User } from './models';

export type Request = BaseRequest & {
  userId: string | null;
};

export interface Context {
  req: Request;
  res: Response;
  logger: Logger;
  user: User | null;
}
