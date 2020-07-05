import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { Program } from '../../src/models';

exports.up = async (knex: Knex) => {
  await createTable(knex, Program.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.text('name').notNullable();
    tb.text('url').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Program.tableName);
};
