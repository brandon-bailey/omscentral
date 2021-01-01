export interface SearchConfig {
  host: string;
}

export const config: SearchConfig = {
  host: process.env.SEARCHBOX_SSL_URL || process.env.SEARCHBOX_URL || '',
};
