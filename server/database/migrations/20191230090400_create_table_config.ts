import Knex from 'knex';

import { Config } from '../../src/models';
import { createTable, dropTable } from '../utils';

exports.up = async (knex: Knex) => {
  await createTable(knex, Config.tableName, (tb) => {
    tb.string('id').notNullable().primary();
    tb.text('value').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Config.tableName);
};
