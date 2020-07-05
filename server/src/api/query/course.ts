import { notFound } from '@hapi/boom';

import { QueryResolvers } from '../../graphql';
import { Course } from '../../models';

type Resolver = QueryResolvers['course'];

export const resolver: Resolver = async (_, { id }) => {
  const course = await Course.eagerQuery().findById(id);
  if (!course) {
    throw notFound();
  }
  return course;
};
