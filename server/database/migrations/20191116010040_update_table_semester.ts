import Knex from 'knex';

import { semesters } from '../data';
import { Semester } from '../../src/models';

exports.up = async (knex: Knex) => {
  await Semester.query(knex).upsertGraph(semesters, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  await Semester.query(knex).delete();
};
