import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { User, Program, Specialization } from '../../src/models';
import { AuthProvider, Role } from '../../src/enums';

exports.up = async (knex: Knex) => {
  await createTable(knex, User.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.enu('auth_provider', Object.values(AuthProvider)).notNullable();
    tb.text('password_hash').nullable();
    tb.text('password_salt').nullable();
    tb.text('email').nullable();
    tb.text('name').nullable();
    tb.enu('role', Object.values(Role)).notNullable();
    tb.text('photo_url').nullable();

    tb.string('program_id')
      .nullable()
      .references('id')
      .inTable(Program.tableName)
      .index(`index_${User.tableName}_program_id`)
      .onDelete('CASCADE');

    tb.string('specialization_id')
      .nullable()
      .references('id')
      .inTable(Specialization.tableName)
      .index(`index_${User.tableName}_specialization_id`)
      .onDelete('CASCADE');

    tb.boolean('anonymous').notNullable().defaultTo(true);

    tb.bigInteger('last_signed_in').nullable();

    tb.bigInteger('created').notNullable();
    tb.bigInteger('updated').nullable();
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, User.tableName);
};
