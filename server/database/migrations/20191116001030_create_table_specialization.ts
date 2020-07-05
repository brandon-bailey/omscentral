import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { Specialization, Program } from '../../src/models';

exports.up = async (knex: Knex) => {
  await createTable(knex, Specialization.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.string('program_id')
      .notNullable()
      .references('id')
      .inTable(Program.tableName)
      .index(`index_${Specialization.tableName}_program_id`)
      .onDelete('CASCADE');

    tb.text('name').notNullable();
    tb.jsonb('requirements').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Specialization.tableName);
};
