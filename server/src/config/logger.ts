export interface LoggerConfig {
  level: string;
}

export const config: LoggerConfig = {
  level: process.env.OMSCENTRAL_LOG_LEVEL || 'error',
};
