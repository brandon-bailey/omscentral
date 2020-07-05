import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { Review, User, Course, Semester } from '../../src/models';

exports.up = async (knex: Knex) => {
  await createTable(knex, Review.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.string('author_id')
      .notNullable()
      .references('id')
      .inTable(User.tableName)
      .index(`index_${Review.tableName}_author_id`)
      .onDelete('CASCADE');

    tb.string('course_id')
      .notNullable()
      .references('id')
      .inTable(Course.tableName)
      .index(`index_${Review.tableName}_course_id`)
      .onDelete('CASCADE');

    tb.string('semester_id')
      .notNullable()
      .references('id')
      .inTable(Semester.tableName)
      .index(`index_${Review.tableName}_semester_id`)
      .onDelete('CASCADE');

    tb.integer('difficulty').unsigned().nullable();

    tb.integer('rating').unsigned().nullable();

    tb.decimal('workload').unsigned().nullable();

    tb.text('body').nullable();
    tb.jsonb('meta').nullable();

    tb.bigInteger('created').notNullable();
    tb.bigInteger('updated').nullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Review.tableName);
};
