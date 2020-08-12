import { forbidden, isBoom } from '@hapi/boom';
import { rule, shield, allow, deny } from 'graphql-shield';

import { appConfig } from '../config';
import { Context } from '../types';
import { logger } from '../components';

const isSignedIn = rule()((_, __, { user }: Context) => !!user);

const isSelf = rule()(
  (_, { id }: { id: string }, { user }: Context) => id === user?.id,
);

export const permissions = shield(
  {
    Query: {
      '*': deny,
      config: allow,
      course: allow,
      courses: allow,
      programs: allow,
      review: allow,
      semesters: allow,
      specializations: allow,
      user: isSelf,
      reviews: allow,
    },
    Mutation: {
      '*': deny,
      upsertUser: isSignedIn,
      updateUser: isSignedIn,
      insertReview: isSignedIn,
      updateReview: isSignedIn,
      deleteReview: isSignedIn,
    },
  },
  {
    fallbackRule: allow,
    fallbackError: (error: any): any => {
      if (error && !isBoom(error)) {
        logger.error('fallbackError: ', error);
      }
      if (appConfig.environment === 'production') {
        throw forbidden();
      } else {
        throw forbidden(error);
      }
    },
  },
);
