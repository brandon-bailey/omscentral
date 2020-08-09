import { PhaseFunction } from '../components';
import { indexReviews } from '../functions';

export const phase: PhaseFunction = async (app, next) => {
  try {
    await indexReviews();
    next();
  } catch (error) {
    next(error);
  }
};
