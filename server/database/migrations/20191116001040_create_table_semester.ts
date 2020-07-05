import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { Semester } from '../../src/models';

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
