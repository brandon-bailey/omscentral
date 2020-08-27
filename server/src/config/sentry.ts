export interface SentryConfig {
  dsn: string;
}

export const config: SentryConfig = {
  dsn: process.env.OMSCENTRAL_SENTRY_DSN || process.env.SENTRY_DSN || '',
};
