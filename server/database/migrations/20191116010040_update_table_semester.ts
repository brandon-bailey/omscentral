import Knex from 'knex';

import { Semester } from '../../src/models';
import { semesters } from '../data';

exports.up = async (knex: Knex) => {
  await Semester.query(knex).upsertGraph(semesters, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  await Semester.query(knex).delete();
};
