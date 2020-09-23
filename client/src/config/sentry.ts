import { BrowserOptions } from '@sentry/browser';

export interface SentryConfig extends BrowserOptions {
  dsn: string;
}

export const config: SentryConfig = {
  dsn: process.env.REACT_APP_SENTRY_DSN!,
  enabled: Boolean(process.env.REACT_APP_SENTRY_DSN),
};
