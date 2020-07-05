import http from 'http';

import { PhaseFunction } from '../components';
import { appConfig } from '../config';

export const phase: PhaseFunction = (app, next) => {
  app.set('port', appConfig.port);
  app.set('server', http.createServer(app));
  next();
};
