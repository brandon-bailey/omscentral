import Knex from 'knex';

import { Config } from '../../src/models';
import { configs } from '../data';

exports.up = async (knex: Knex) => {
  await Config.query(knex).upsertGraph(configs, { insertMissing: true });
};

exports.down = async (knex: Knex) => {
  await Config.query(knex).delete();
};
