import { raw, PartialModelObject as PMO } from 'objection';

import { Domain, Review, CourseMetric as CM } from '../models';

class Metric extends Domain {
  static tableName = '_virtual';

  course_id!: string;
  count!: number;
  difficulty_mean!: number;
  difficulty_median!: number;
  difficulty_mode!: number;
  difficulty_min!: number;
  difficulty_max!: number;
  workload_mean!: number;
  workload_median!: number;
  workload_mode!: number;
  workload_min!: number;
  workload_max!: number;
  rating_mean!: number;
  rating_median!: number;
  rating_mode!: number;
  rating_min!: number;
  rating_max!: number;
}

const toCourseMetric = (metric: Metric): PMO<CM> => ({
  course_id: metric.course_id,
  reviews: {
    count: metric.count,
    difficulty: {
      mean: metric.difficulty_mean,
      median: metric.difficulty_median,
      mode: metric.difficulty_mode,
      min: metric.difficulty_min,
      max: metric.difficulty_max,
    },
    workload: {
      mean: metric.workload_mean,
      median: metric.workload_median,
      mode: metric.workload_mode,
      min: metric.workload_min,
      max: metric.workload_max,
    },
    rating: {
      mean: metric.rating_mean,
      median: metric.rating_median,
      mode: metric.rating_mode,
      min: metric.rating_min,
      max: metric.rating_max,
    },
  },
});

interface UpsertCourseMetrics {
  (): Promise<CM[]>;
  (id: string): Promise<CM[]>;
  (ids: string[]): Promise<CM[]>;
}

export const upsertCourseMetrics: UpsertCourseMetrics = async (
  idOrIds?: string | string[],
): Promise<CM[]> => {
  const ids = !idOrIds
    ? []
    : (typeof idOrIds === 'string' ? [idOrIds] : idOrIds).filter(Boolean);

  const fetchMetrics = Metric.query()
    .from(Review.tableName)
    .select('course_id')
    .select(raw(`cast(count(id) as integer) as count`))
    .modify((query) =>
      ['difficulty', 'workload', 'rating'].map((col) =>
        query
          .select(raw(`avg(${col}) as ${col}_mean`))
          .select(raw(`median(${col}) as ${col}_median`))
          .select(raw(`mode() within group (order by ${col}) as ${col}_mode`))
          .select(raw(`min(${col}) as ${col}_min`))
          .select(raw(`max(${col}) as ${col}_max`)),
      ),
    )
    .modify((query) => ids.length && query.whereIn('course_id', ids))
    .groupBy('course_id');

  const [metrics] = await Promise.all([
    fetchMetrics,
    CM.query()
      .delete()
      .modify((query) => ids.length && query.whereIn('course_id', ids)),
  ]);

  return CM.query().upsertGraphAndFetch(metrics.map(toCourseMetric), {
    insertMissing: true,
  });
};
