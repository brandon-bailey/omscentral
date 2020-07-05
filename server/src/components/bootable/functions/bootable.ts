import { Express } from 'express';
import { assign } from 'lodash';

import { Bootable } from '../models';
import { Logger, BootableExpress } from '../interfaces';

/**
 * Decorator that injects bootable capabilities to an express app by adding
 * #phase and #boot methods that are used to register phases and boot the app.
 *
 * @param app
 * @param logger
 * @returns Bootable express app.
 */
export const bootable = (app: Express, logger?: Logger): BootableExpress => {
  const { boot, phase } = new Bootable(app, logger || console);

  return assign(app, {
    boot,
    phase,
  });
};
