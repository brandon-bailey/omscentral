import { createLogger, format, transports } from 'winston';

import { loggerConfig } from '../../config';

const logger = createLogger({
  level: loggerConfig.level,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

export { logger };
