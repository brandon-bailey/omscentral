import Knex from 'knex';

import { Specialization } from '../../src/models';
import { specializations } from '../data';

exports.up = async (knex: Knex) => {
  await Specialization.query(knex).upsertGraph(specializations, {
    insertMissing: true,
  });
};

exports.down = async (knex: Knex) => {
  await Specialization.query(knex).delete();
};
