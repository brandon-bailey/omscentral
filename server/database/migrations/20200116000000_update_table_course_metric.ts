import Knex from 'knex';

import { dropTable, dropColumn, addColumn } from '../utils';
import { CourseMetric } from '../../src/models';

exports.up = async (knex: Knex) => {
  CourseMetric.knex(knex);
  await CourseMetric.query().delete();
  await dropColumn(knex, CourseMetric.tableName, 'data');
  await addColumn(knex, CourseMetric.tableName, 'reviews', (tb) => {
    tb.jsonb('reviews').notNullable();
  });
  await addColumn(knex, CourseMetric.tableName, 'reviews', (tb) => {
    tb.jsonb('grades').nullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, CourseMetric.tableName);
};
