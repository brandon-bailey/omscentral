require('./env')();

import { AddressInfo } from 'net';
import { Server } from 'http';

import { app } from './app';
import { logger } from './components';

app.boot((error?: Error) => {
  if (error) {
    throw error;
  }

  const server: Server = app.get('server');
  const port: number = app.get('port');

  server.listen(port, () => {
    const address = server.address() as AddressInfo;
    logger.info(`🚀 Server listening on port ${address.port} ...`);
  });
});
