export interface SentryConfig {
  dsn: string;
}

export const config: SentryConfig = {
  dsn: process.env.SENTRY_DSN || '',
};
