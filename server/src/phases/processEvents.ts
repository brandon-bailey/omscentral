import { PhaseFunction, logger } from '../components';

export const phase: PhaseFunction = (app, next) => {
  process.on('unhandledRejection', (reason: any) => {
    logger.error('process(unhandledRejection):', reason);
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('process(uncaughtException):', error);
    process.exit(1);
  });

  process.on('SIGTERM', (signal) => {
    logger.debug('process(SIGTERM):', signal);
    process.exit(0);
  });

  next();
};
