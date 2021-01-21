import Knex from 'knex';

import { Course } from '../../src/models';
import { createTable, dropTable } from '../utils';

exports.up = async (knex: Knex) => {
  await createTable(knex, Course.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.string('department').notNullable();
    tb.string('number').notNullable();
    tb.text('name').notNullable();
    tb.boolean('foundational').notNullable();
    tb.boolean('deprecated').notNullable();
    tb.string('link').nullable();
    tb.jsonb('aliases').notNullable().defaultTo([]);
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Course.tableName);
};
