import Knex from 'knex';

import { Program } from '../../src/models';
import { programs } from '../data';

exports.up = async (knex: Knex) => {
  await Program.query(knex).upsertGraph(programs, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  await Program.query(knex).delete();
};
