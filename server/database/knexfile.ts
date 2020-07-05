import { argv } from 'yargs';

require('../src/env')(argv.env ? `.env.${argv.env}` : '.env');

import pg from 'pg';
import path from 'path';
import { Config } from 'knex';

import { postgresConfig } from '../src/config';
import { Migration } from '../src/models';

pg.types.setTypeParser(1700, parseFloat);

const config: Config = {
  client: 'pg',
  debug: Boolean(argv.debug),
  connection: postgresConfig.connection,
  migrations: {
    directory: path.join(__dirname, 'migrations'),
    tableName: Migration.tableName,
  },
  seeds: {
    directory: path.join(__dirname, 'seeds'),
  },
};

export default module.exports = config;
