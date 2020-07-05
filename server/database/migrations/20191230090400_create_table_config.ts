import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { Config } from '../../src/models';

exports.up = async (knex: Knex) => {
  await createTable(knex, Config.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.text('value').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Config.tableName);
};
