import { badRequest, forbidden } from '@hapi/boom';

import { upsertUser } from '../../functions';
import { MutationResolvers } from '../../graphql';
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

  return upsertUser(req.userId, value);
};
