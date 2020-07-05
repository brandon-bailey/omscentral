import { PhaseFunction } from '../components';
import { upsertCourseMetrics } from '../functions';

export const phase: PhaseFunction = async (app, next) => {
  try {
    await upsertCourseMetrics();
    next();
  } catch (error) {
    next(error);
  }
};
