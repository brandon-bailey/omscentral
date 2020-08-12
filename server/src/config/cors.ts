export interface CORSConfig {
  whitelist: string[];
}

export const config: CORSConfig = {
  whitelist: (process.env.OMSCENTRAL_CORS_WHITELIST || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
