import { Express } from 'express';

import { PhaseCallback } from './PhaseCallback';

/**
 * Phase function, which may be synchronous or asynchronous. Invoke `done` when
 * finished with phase if async.
 */
export interface PhaseFunction {
  (app: Express, next: PhaseCallback): void;
}
