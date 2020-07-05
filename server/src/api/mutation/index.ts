import { MutationResolvers } from '../../graphql';

import { resolver as upsertUser } from './upsertUser';
import { resolver as updateUser } from './updateUser';
import { resolver as insertReview } from './insertReview';
import { resolver as updateReview } from './updateReview';
import { resolver as deleteReview } from './deleteReview';

export const Mutation: MutationResolvers = {
  upsertUser,
  updateUser,
  insertReview,
  updateReview,
  deleteReview,
};
