import Knex from 'knex';

import { specializations as data } from '../data';
import { Specialization as Model } from '../../src/models';

exports.up = async (knex: Knex) => {
  Model.knex(knex);
  await Model.query().upsertGraph(data, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  Model.knex(knex);
  await Model.query().delete();
};
