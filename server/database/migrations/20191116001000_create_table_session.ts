import Knex from 'knex';

import { createTable, dropTable } from '../utils';
import { Session } from '../../src/models';

exports.up = async (knex: Knex) => {
  await createTable(knex, Session.tableName, (tb) => {
    tb.string('id').notNullable().primary();

    tb.json('sess').notNullable();

    tb.timestamp('expired')
      .notNullable()
      .index(`index_${Session.tableName}_expired`);
  });
};

exports.down = async (knex: Knex) => {
  await dropTable(knex, Session.tableName);
};
