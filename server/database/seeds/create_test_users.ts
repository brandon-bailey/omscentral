import Knex from 'knex';
import { Model } from 'objection';

import { appConfig } from '../../src/config';
import { AuthProvider, Role } from '../../src/enums';
import { Program, Specialization } from '../../src/models';
import { upsertUser } from '../../src/functions';

export const seed = async (knex: Knex): Promise<void> => {
  if (appConfig.environment === 'production') {
    return;
  }

  Model.knex(knex);

  await upsertUser('2iAc9zFUeUcCblZ68PTOqdFdpSr1', {
    auth_provider: AuthProvider.Password,
    email: 'user@omscentral.com',
    name: 'Test User',
    role: Role.Basic,
    anonymous: false,
    program: await Program.query().first(),
    specialization: await Specialization.query().first(),
    last_signed_in: +new Date(),
  });
};
