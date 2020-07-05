import pg from 'pg';

import { PhaseFunction } from '../components';

export const phase: PhaseFunction = (app, next) => {
  pg.types.setTypeParser(1700, parseFloat);
  next();
};
