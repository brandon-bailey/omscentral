import { QueryResolvers } from '../../graphql';
import { Program } from '../../models';

type Resolver = QueryResolvers['programs'];

export const resolver: Resolver = () => Program.query().orderBy('name');
