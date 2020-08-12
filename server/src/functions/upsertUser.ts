import { PartialModelObject as PMO } from 'objection';

import { Role } from '../enums';
import { User } from '../models';
import { updateUser } from './updateUser';

export const upsertUser = async (
  id: string,
  user: PMO<User>,
): Promise<User> => {
  const existing = await User.query().findById(user.id as string);
  if (existing) {
    return updateUser(id, {
      ...user,
      name: existing.name || user.name,
    });
  }

  return User.eagerQuery().insertAndFetch({
    ...user,
    role: Role.Basic,
  });
};
