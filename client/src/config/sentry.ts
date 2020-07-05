export interface SentryConfig {
  dsn: string;
}

export const config: SentryConfig = {
  dsn: process.env.REACT_APP_SENTRY_DSN!,
};
