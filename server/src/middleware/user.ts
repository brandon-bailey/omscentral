import { RequestHandler } from 'express';

import { firebase } from '../components';
import { Request } from '../types';

export const middleware = (): RequestHandler => async (req, res, next) => {
  (req as Request).userId = null;

  try {
    const idToken = req.headers.authorization;
    if (idToken) {
      const { uid } = await firebase.auth().verifyIdToken(idToken);
      (req as Request).userId = uid;
    }
  } catch {}

  next();
};
