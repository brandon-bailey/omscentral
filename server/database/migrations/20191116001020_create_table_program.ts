import Knex from 'knex';

import { Program } from '../../src/models';
import { createTable, dropTable } from '../utils';

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
