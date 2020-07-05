import { forbidden, badRequest } from '@hapi/boom';

import { MutationResolvers } from '../../graphql';
import { upsertUser } from '../../functions';
import { userSchema } from '../schema';

type Resolver = MutationResolvers['upsertUser'];

export const resolver: Resolver = async (_, { user }, { req }) => {
  if (req.userId !== user.id) {
    throw forbidden();
  }

  const { value, error } = await userSchema.validate(user);
  if (error) {
    throw badRequest(error.message);
  }

  return upsertUser(value);
};
