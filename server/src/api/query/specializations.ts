import { QueryResolvers } from '../../graphql';
import { Specialization } from '../../models';

type Resolver = QueryResolvers['specializations'];

export const resolver: Resolver = () =>
  Specialization.eagerQuery().orderBy('name');
