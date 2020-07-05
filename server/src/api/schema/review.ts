import { object, string, number } from '@hapi/joi';

export const schema = object().keys({
  id: string(),
  author_id: string().required(),
  course_id: string().required(),
  semester_id: string().required(),
  difficulty: number().min(1).max(5).integer().required(),
  rating: number().min(1).max(5).integer().required(),
  workload: number().min(1).max(100).integer().required(),
  body: string().required(),
});
