import { PartialModelObject as PMO } from 'objection';

import { User } from '../models';
import { Role } from '../enums';
import { updateUser } from './updateUser';

export const upsertUser = async (user: PMO<User>): Promise<User> => {
  const existing = await User.query().findById(user.id as string);
  if (existing) {
    return updateUser({
      ...user,
      name: existing.name || user.name,
    });
  }

  return User.query().insertAndFetch({
    ...user,
    role: Role.Basic,
  });
};
