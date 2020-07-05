import { PartialModelObject as PMO } from 'objection';
import { User } from '../models';

export const updateUser = (user: PMO<User>): Promise<User> =>
  User.query().updateAndFetchById(user.id as string, user);
