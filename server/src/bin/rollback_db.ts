import { Model } from 'objection';

import { init } from './utils';

async function main(): Promise<void> {
  let version: number | undefined = undefined;
  while (typeof version === 'undefined' || version > 0) {
    [version] = await Model.knex().migrate.rollback();
  }
}

init(main);
