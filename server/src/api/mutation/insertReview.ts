import { badRequest, forbidden } from '@hapi/boom';

import { insertReview } from '../../functions';
import { MutationResolvers } from '../../graphql';
import { reviewSchema } from '../schema';

type Resolver = MutationResolvers['insertReview'];

export const resolver: Resolver = async (_, { review }, { req }) => {
  if (review.author_id !== req.userId) {
    throw forbidden();
  }

  const { value, error } = await reviewSchema.validate(review);
  if (error) {
    throw badRequest(error.message);
  }

  return insertReview(value);
};
