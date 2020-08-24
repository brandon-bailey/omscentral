export interface SearchConfig {
  host: string;
}

export const config: SearchConfig = {
  host: process.env.SEARCHBOX_SSL_URL || process.env.SEARCHBOX_URL || '',
};

if (!config.host) {
  throw new Error('process.env.SEARCHBOX[_SSL]_URL required');
}
