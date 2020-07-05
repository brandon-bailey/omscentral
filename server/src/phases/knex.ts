import knex, { Config } from 'knex';
import { Model } from 'objection';

import { PhaseFunction } from '../components';
import { postgresConfig } from '../config';

export const phase: PhaseFunction = (app, next) => {
  const knexConfig: Config = {
    client: 'pg',
    connection: postgresConfig.connection,
  };

  Model.knex(knex(knexConfig));

  next();
};
