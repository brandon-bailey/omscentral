export interface PostgresConfig {
  connection: string;
}

export const config: PostgresConfig = {
  connection:
    process.env.OMSCENTRAL_POSTGRES_CONNECTION ||
    process.env.DATABASE_URL ||
    '',
};

if (!config.connection) {
  throw new Error('process.env.OMSCENTRAL_POSTGRES_CONNECTION required');
}
