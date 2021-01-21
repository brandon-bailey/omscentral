import Knex from 'knex';

import { Course, CourseMetric } from '../../src/models';
import { createTable, dropTable } from '../utils';

exports.up = async (knex: Knex) => {
  await createTable(knex, CourseMetric.tableName, (tb) => {
    tb.string('course_id')
      .notNullable()
      .unique()
      .references('id')
      .inTable(Course.tableName)
      .index(`index_${CourseMetric.tableName}_course_id`)
      .onDelete('CASCADE')
      .primary();

    tb.jsonb('reviews').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, CourseMetric.tableName);
};
