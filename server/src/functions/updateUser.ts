import { PartialModelObject as PMO } from 'objection';

import { User } from '../models';

export const updateUser = (id: string, user: PMO<User>): Promise<User> =>
  User.eagerQuery().updateAndFetchById(id, user);
