import Knex from 'knex';

import { Semester } from '../../src/models';
import { createTable, dropTable } from '../utils';

exports.up = async (knex: Knex) => {
  await createTable(knex, Semester.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.integer('year').notNullable();
    tb.integer('season').notNullable();
    tb.text('name').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Semester.tableName);
};
