import { QueryResolvers } from '../../graphql';
import { Config } from '../../models';

type Resolver = QueryResolvers['config'];

export const resolver: Resolver = (_, { id }) => Config.query().findById(id);
