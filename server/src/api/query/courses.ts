import { QueryResolvers } from '../../graphql';
import { Course } from '../../models';

type Resolver = QueryResolvers['courses'];

export const resolver: Resolver = () => Course.eagerQuery().orderBy('id');
