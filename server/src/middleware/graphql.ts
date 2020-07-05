import { applyMiddleware } from 'graphql-middleware';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { RequestHandler, Response } from 'express';
import fs from 'fs';

import { graphqlConfig } from '../config';
import { logger } from '../components';
import { Mutation, Query } from '../api';
import { Request, Context } from '../types';
import { User } from '../models';

export const middleware = (schemaFile: string): RequestHandler => {
  const schema = applyMiddleware(
    makeExecutableSchema<Context>({
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      typeDefs: fs.readFileSync(schemaFile, 'utf8'),
      resolvers: {
        Query,
        Mutation,
      },
    }),
  );

  return graphqlHTTP(async (req, res) => {
    const { userId } = req as Request;

    const context: Context = {
      req: req as Request,
      res: res as Response,
      user: userId ? await User.eagerQuery().findById(userId) : null,
      logger,
    };

    return {
      schema,
      graphiql: graphqlConfig.inspector,
      context,
    };
  });
};
