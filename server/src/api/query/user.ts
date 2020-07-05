import { notFound } from '@hapi/boom';

import { QueryResolvers } from '../../graphql';
import { User } from '../../models';

type Resolver = QueryResolvers['user'];

export const resolver: Resolver = async (_, { id }) => {
  const user = await User.eagerQuery().findById(id);
  if (!user) {
    throw notFound();
  }
  return user;
};
