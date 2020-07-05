type Format = 'combined' | 'common' | 'dev' | 'short' | 'tiny';

export interface MorganConfig {
  /**
   * HTTP request logging format. This is used only when NODE_ENV is non-local.
   *
   * @see https://github.com/expressjs/morgan#predefined-formats
   */
  format: Format;
}

export const config: MorganConfig = {
  format: (process.env.OMSCENTRAL_MORGAN_FORMAT || 'dev') as Format,
};
